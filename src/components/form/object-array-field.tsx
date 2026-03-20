'use client';

import { GripVertical } from 'lucide-react';
import * as React from 'react';
import {
  ArrayPath,
  FieldArrayWithId,
  FieldValues,
  Path,
  UseFormReturn,
  useFieldArray,
} from 'react-hook-form';

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { AddButton } from '@/components/button/add-button';
import { cn } from '@/lib/utils';

import Button from '../button';
import { DeleteButton } from '../button/delete-btn';

type RenderItemArgs<TFormValues extends FieldValues> = {
  index: number;
  item: FieldArrayWithId<TFormValues, ArrayPath<TFormValues>>;
  disabled: boolean;
  getName: <K extends string>(key: K) => Path<TFormValues>;
  remove: () => void;
};

export type ObjectArrayFieldProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  name: ArrayPath<TFormValues>;
  label?: string;
  description?: string;
  emptyText?: string;
  addLabel?: string;
  disabled?: boolean;
  newItem: () => Record<string, unknown>;
  orderKey?: string;
  renderItem: (args: RenderItemArgs<TFormValues>) => React.ReactNode;
};

function SortableRow({
  id,
  disabled,
  children,
}: {
  id: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn('group', isDragging && 'bg-muted/60')}
      data-dragging={isDragging ? 'true' : 'false'}
    >
      <div className='flex items-start gap-3'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          aria-label='Drag to reorder'
          disabled={disabled}
          {...attributes}
          {...listeners}
        >
          <GripVertical className='h-4 w-4' />
        </Button>
        <div className='min-w-0 flex-1'>{children}</div>
      </div>
    </div>
  );
}

export function ObjectArrayField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  description,
  emptyText = 'No items yet.',
  addLabel = 'Add',
  disabled = false,
  newItem,
  orderKey,
  renderItem,
}: ObjectArrayFieldProps<TFormValues>) {
  const pathName = name as unknown as Path<TFormValues>;
  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name,
  });

  const syncOrder = React.useCallback(() => {
    if (!orderKey) return;
    const current = form.getValues(pathName) as unknown as
      | Array<Record<string, unknown>>
      | undefined;
    if (!Array.isArray(current)) return;

    current.forEach((_, idx) => {
      form.setValue(
        `${String(name)}.${idx}.${orderKey}` as Path<TFormValues>,
        idx as never,
        {
          shouldDirty: true,
          shouldTouch: false,
          shouldValidate: false,
        },
      );
    });
  }, [form, name, orderKey, pathName]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onAdd = () => {
    if (disabled) return;
    const item = newItem();
    if (
      orderKey &&
      typeof item === 'object' &&
      item !== null &&
      !(orderKey in item)
    ) {
      (item as Record<string, unknown>)[orderKey] = fields.length;
    }
    append(item as never, { shouldFocus: true });
    queueMicrotask(syncOrder);
  };

  const onRemove = (index: number) => {
    if (disabled) return;
    remove(index);
    queueMicrotask(syncOrder);
  };

  const onMove = (from: number, to: number) => {
    if (disabled) return;
    move(from, to);
    queueMicrotask(syncOrder);
  };

  const onDragEnd = (event: DragEndEvent) => {
    if (disabled) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = fields.findIndex((f) => f.id === String(active.id));
    const toIndex = fields.findIndex((f) => f.id === String(over.id));
    if (fromIndex === -1 || toIndex === -1) return;

    onMove(fromIndex, toIndex);
  };

  return (
    <section className='space-y-3'>
      <header className='space-y-1 relative mb-6'>
        {label && <div className='text-sm font-medium'>{label}</div>}
        {description && (
          <div className='text-sm text-muted-foreground'>{description}</div>
        )}
        <AddButton
          className='absolute top-0 right-2'
          onClick={onAdd}
          label={addLabel}
        />
      </header>

      <div className='space-y-3'>
        {fields.length === 0 && (
          <div className='rounded-md border border-dashed p-3 text-sm text-muted-foreground'>
            {emptyText}
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className='space-y-3'>
              {fields.map((item, index) => {
                const getName = <K extends string>(key: K) =>
                  `${name}.${index}.${key}` as Path<TFormValues>;

                return (
                  <SortableRow key={item.id} id={item.id} disabled={disabled}>
                    <div className='flex items-start gap-3'>
                      <div className='min-w-0 flex-1 space-y-3'>
                        {renderItem({
                          index,
                          item,
                          disabled,
                          getName,
                          remove: () => onRemove(index),
                        })}
                      </div>
                      <DeleteButton
                        onClick={() => onRemove(index)}
                        className='mt-0.5 shrink-0 text-muted-foreground hover:text-foreground'
                      />
                    </div>
                  </SortableRow>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
}
