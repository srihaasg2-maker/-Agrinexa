import React from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Printer, X, GraduationCap, CheckCircle2 } from 'lucide-react';
import { printDocument, formatCurrency } from '../../utils/printUtils';

interface FeeReceiptPDFProps {
  isOpen: boolean;
  onClose: () => void;
  receiptNumber?: string;
}

export const FeeReceiptPDF: React.FC<FeeReceiptPDFProps> = ({ 
  isOpen, 
  onClose, 
  receiptNumber = 'REC-2024-SEM3-001' 
}) => {
  const { student, fees } = useScholar();

  if (!isOpen) return null;

  const handlePrint = () => {
    printDocument(`Official_Fee_Receipt_${receiptNumber}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 md:p-8 bg-black/60 backdrop-blur-xs flex items-center justify-center">
      <div className="relative w-full max-w-3xl bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden my-6 border border-gray-200">
        
        {/* Toolbar */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-sm sm:text-base">
              Official University Fee Receipt & Tax Invoice
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt */}
        <div className="p-8 sm:p-10 bg-white text-gray-900 print-container">
          
          {/* Header */}
          <div className="border-b-2 border-emerald-600 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight">
                    KOMMURI PRATHA REDDY INSTITUTE OF TECHNOLOGY
                  </h1>
                  <p className="text-xs text-gray-600">
                    Department of Finance & Accounts • Hyderabad, Telangana • GSTIN: 36AAAAA0000A1Z5
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-gray-400 block">RECEIPT NO</span>
                <span className="text-sm font-bold font-mono text-emerald-700">{receiptNumber}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-gray-500">Date of Payment: <strong>July 15, 2024</strong></span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Payment Confirmed (Paid in Full)
              </span>
            </div>
          </div>

          {/* Student Billing Details */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs mb-6">
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Billed To Candidate</span>
              <p className="font-bold text-gray-900 text-sm">{student.name}</p>
              <p className="text-gray-600">Roll No: {student.rollNumber}</p>
              <p className="text-gray-600">Student ID: {student.id}</p>
            </div>
            <div className="text-right">
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Academic Details</span>
              <p className="font-bold text-gray-900">B.Tech - {student.department || 'CSE'}</p>
              <p className="text-gray-600">Semester {student.currentSemester} (2024-2025)</p>
              <p className="text-gray-600">Payment Mode: NetBanking (HDFC #TX9928174)</p>
            </div>
          </div>

          {/* Fee Breakdown Table */}
          <table className="w-full text-xs text-left border-collapse border border-gray-300 mb-6">
            <thead className="bg-gray-100 text-gray-800 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-3 border border-gray-300">#</th>
                <th className="py-2.5 px-3 border border-gray-300">Description of Fee Component</th>
                <th className="py-2.5 px-3 border border-gray-300 text-right">Applicable Period</th>
                <th className="py-2.5 px-3 border border-gray-300 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              <tr>
                <td className="py-2.5 px-3 border border-gray-300">1</td>
                <td className="py-2.5 px-3 border border-gray-300 font-semibold text-gray-900">Tuition Fee & Academic Instruction</td>
                <td className="py-2.5 px-3 border border-gray-300 text-right text-gray-500">Sem {student.currentSemester}</td>
                <td className="py-2.5 px-3 border border-gray-300 text-right font-mono">{formatCurrency(fees.tuitionFee)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 border border-gray-300">2</td>
                <td className="py-2.5 px-3 border border-gray-300 font-semibold text-gray-900">Computer Laboratory & Practical Workshop Charges</td>
                <td className="py-2.5 px-3 border border-gray-300 text-right text-gray-500">Sem {student.currentSemester}</td>
                <td className="py-2.5 px-3 border border-gray-300 text-right font-mono">{formatCurrency(fees.labFee)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 border border-gray-300">3</td>
                <td className="py-2.5 px-3 border border-gray-300 font-semibold text-gray-900">Sports, Gymnasium & Physical Education Amenities</td>
                <td className="py-2.5 px-3 border border-gray-300 text-right text-gray-500">Sem {student.currentSemester}</td>
                <td className="py-2.5 px-3 border border-gray-300 text-right font-mono">{formatCurrency(fees.sportsFee)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 border border-gray-300">4</td>
                <td className="py-2.5 px-3 border border-gray-300 font-semibold text-gray-900">Central Digital Library & Journal Access Subscription</td>
                <td className="py-2.5 px-3 border border-gray-300 text-right text-gray-500">Sem {student.currentSemester}</td>
                <td className="py-2.5 px-3 border border-gray-300 text-right font-mono">{formatCurrency(fees.libraryFee)}</td>
              </tr>
              <tr className="bg-emerald-50/60 font-bold text-gray-900">
                <td colSpan={3} className="py-3 px-3 border border-gray-300 text-right uppercase text-xs">
                  Total Institutional Fee
                </td>
                <td className="py-3 px-3 border border-gray-300 text-right text-sm font-mono text-emerald-800">
                  {formatCurrency(fees.totalFee)}
                </td>
              </tr>
              <tr className="bg-gray-50 text-gray-700">
                <td colSpan={3} className="py-2 px-3 border border-gray-300 text-right uppercase text-[10px]">
                  Net Paid Amount
                </td>
                <td className="py-2 px-3 border border-gray-300 text-right font-mono font-bold text-emerald-700">
                  {formatCurrency(fees.amountPaid)}
                </td>
              </tr>
              <tr className="bg-gray-50 text-gray-700">
                <td colSpan={3} className="py-2 px-3 border border-gray-300 text-right uppercase text-[10px]">
                  Balance Due / Outstanding
                </td>
                <td className="py-2 px-3 border border-gray-300 text-right font-mono font-bold text-gray-600">
                  {formatCurrency(fees.pendingAmount)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Amount In Words & Notes */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 mb-8">
            <span className="text-gray-500 font-semibold">Amount In Words: </span>
            <span className="font-bold text-gray-900">Rupees One Lakh Seventy-Seven Thousand Only</span>
          </div>

          {/* Authorized Signatory */}
          <div className="pt-6 border-t border-gray-300 flex items-center justify-between text-xs text-gray-500">
            <div>
              <p className="font-mono text-[10px]">COMPUTER-GENERATED OFFICIAL TAX RECEIPT</p>
              <p className="text-[10px] text-gray-400">No physical signature required if verified via portal QR.</p>
            </div>
            <div className="text-center">
              <div className="h-10 border-b border-gray-400 w-36 flex items-center justify-center italic text-emerald-700 font-serif font-bold">
                Accounts Officer
              </div>
              <span className="text-[10px] font-bold text-gray-700 uppercase mt-1 block">Bursar & Accounts Section</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
