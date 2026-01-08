import { Document, Page, Text, View } from '@react-pdf/renderer';

import { styles } from './styles';
import { PdfDownloadProps } from './types';

export function PdfDownload({ data }: PdfDownloadProps) {
  const lineItems = data.lineItems || [];
  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>
              {data.invoiceNumber || 'INV-000'}
            </Text>
          </View>
          <View style={styles.dateSection}>
            <Text style={styles.dateLabel}>Date</Text>
            <Text style={styles.dateValue}>{data.invoiceDate}</Text>
            <Text style={styles.dateLabel}>Due Date</Text>
            <Text style={styles.dateValue}>{data.dueDate}</Text>
          </View>
        </View>

        {/* From/To Section */}
        <View style={styles.partyGrid}>
          <View style={styles.partySection}>
            <Text style={styles.partyLabel}>From</Text>
            <Text style={styles.partyName}>{data.fromName}</Text>
            <Text style={styles.partyDetail}>{data.fromEmail}</Text>
            {data.fromAddress && (
              <Text style={styles.partyDetail}>{data.fromAddress}</Text>
            )}
          </View>
          <View style={styles.partySection}>
            <Text style={styles.partyLabel}>Bill To</Text>
            <Text style={styles.partyName}>{data.toName}</Text>
            <Text style={styles.partyDetail}>{data.toEmail}</Text>
            {data.toAddress && (
              <Text style={styles.partyDetail}>{data.toAddress}</Text>
            )}
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colDescription]}>
              Description
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableHeaderCell, styles.colRate]}>Rate</Text>
            <Text style={[styles.tableHeaderCell, styles.colAmount]}>
              Amount
            </Text>
          </View>
          {lineItems.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colDescription]}>
                {item.description}
              </Text>
              <Text style={[styles.tableCell, styles.colQty]}>
                {item.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.colRate]}>
                ${item.rate.toFixed(2)}
              </Text>
              <Text style={[styles.tableCellBold, styles.colAmount]}>
                ${(item.quantity * item.rate).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax (10%)</Text>
              <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.finalTotal}>
              <Text style={styles.finalTotalLabel}>Total</Text>
              <Text style={styles.finalTotalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
}
