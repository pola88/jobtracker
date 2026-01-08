import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: '2px solid #e5e7eb',
  },
  invoiceTitle: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
    letterSpacing: -0.5,
  },
  invoiceNumber: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
  },
  dateSection: {
    alignItems: 'flex-end',
  },
  dateLabel: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 3,
  },
  dateValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  partyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  partySection: {
    width: '48%',
  },
  partyLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  partyName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  partyDetail: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 2,
    lineHeight: 1.4,
  },
  table: {
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #f1f5f9',
    paddingVertical: 10,
  },
  tableCell: {
    fontSize: 10,
    color: '#1e293b',
  },
  tableCellBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
  colDescription: {
    width: '45%',
    paddingRight: 8,
  },
  colQty: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
  colRate: {
    width: '20%',
    textAlign: 'right',
    paddingRight: 8,
  },
  colAmount: {
    width: '20%',
    textAlign: 'right',
  },
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  totalsSection: {
    width: 240,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  totalValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
  finalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 8,
    borderTop: '2px solid #e5e7eb',
  },
  finalTotalLabel: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
  finalTotalValue: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
  notesSection: {
    borderTop: '2px solid #e5e7eb',
    paddingTop: 16,
    marginBottom: 16,
  },
  notesLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  notesContent: {
    fontSize: 10,
    color: '#64748b',
    lineHeight: 1.5,
  },
  footer: {
    textAlign: 'center',
    fontSize: 10,
    color: '#94a3b8',
    paddingTop: 16,
    borderTop: '2px solid #e5e7eb',
    fontStyle: 'italic',
  },
});
