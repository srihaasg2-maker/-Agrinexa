import React, { useState } from 'react';
import { useScholar } from '../../context/ScholarContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  ReceiptIndianRupee, 
  CreditCard, 
  CheckCircle2, 
  Download, 
  Upload, 
  FileText, 
  Clock, 
  Send, 
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { formatCurrency, formatDate, triggerConfetti } from '../../utils/printUtils';
import { FeeReceiptPDF } from '../documents/FeeReceiptPDF';
import { ReimbursementClaim } from '../../types/student';

export const FeePage: React.FC = () => {
  const { fees, paymentHistory, reimbursements, addReimbursement } = useScholar();
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // New Claim Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ReimbursementClaim['category']>('Conference / Workshop');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [receiptFileName, setReceiptFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addReimbursement({
        title,
        category,
        amount: Number(amount),
        notes,
        receiptName: receiptFileName || 'voucher_receipt.pdf'
      });
      triggerConfetti();
      setIsSubmitting(false);

      // Reset
      setTitle('');
      setAmount('');
      setNotes('');
      setReceiptFileName(null);
    }, 500);
  };

  const getReimbursementBadge = (status: ReimbursementClaim['status']) => {
    switch (status) {
      case 'Disbursed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Disbursed to Account
          </span>
        );
      case 'Accounts Clearance':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            <Clock className="w-3.5 h-3.5" />
            Accounts Clearance
          </span>
        );
      case 'Advisor Approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Advisor Approved
          </span>
        );
      case 'Submitted':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600">
            <Clock className="w-3.5 h-3.5" />
            Claim Submitted
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            <ReceiptIndianRupee className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Fee & Reimbursement Portal
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Institutional semester fee breakdown, payment receipts, and research reimbursement claims
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowReceiptModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/25 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Official Fee Receipt (PDF)</span>
        </button>
      </div>

      {/* Financial Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700">
          <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Total Semester Fee</span>
          <div className="text-2xl font-black text-gray-900 dark:text-white font-mono mt-1">
            {formatCurrency(fees.totalFee)}
          </div>
          <span className="text-xs text-gray-500 mt-1 block">Full academic year charges</span>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700">
          <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Amount Paid</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            {formatCurrency(fees.amountPaid)}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Reconciled via NetBanking
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700">
          <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Pending Balance</span>
          <div className="text-2xl font-black text-gray-600 dark:text-gray-300 font-mono mt-1">
            {formatCurrency(fees.pendingAmount)}
          </div>
          <span className="text-xs text-gray-400 mt-1 block">No dues outstanding</span>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-card border border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">Payment Status</span>
            <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
              {fees.paymentStatus}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Fee Breakdown Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-slate-700 bg-gray-50/70 dark:bg-slate-800/80 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Semester 3 Fee Structure Breakdown
          </h3>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200">
            Receipt: REC-2024-SEM3-001
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100/70 dark:bg-slate-900/60 text-gray-600 dark:text-gray-300 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200 dark:border-slate-700">
                <th className="py-3 px-4">Fee Component</th>
                <th className="py-3 px-4">Academic Purpose</th>
                <th className="py-3 px-4 text-right">Applicable Amount (INR)</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              <tr>
                <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">Tuition Fee</td>
                <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">Instruction, lecture sessions & faculty mentoring</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-gray-900 dark:text-white">{formatCurrency(fees.tuitionFee)}</td>
                <td className="py-3.5 px-4 text-center"><span className="text-emerald-600 font-bold">Paid</span></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">Lab Fee</td>
                <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">Computer hardware, cloud server instances & software licensing</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-gray-900 dark:text-white">{formatCurrency(fees.labFee)}</td>
                <td className="py-3.5 px-4 text-center"><span className="text-emerald-600 font-bold">Paid</span></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">Sports Fee</td>
                <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">Gymnasium access, indoor arena & sports tournament registrations</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-gray-900 dark:text-white">{formatCurrency(fees.sportsFee)}</td>
                <td className="py-3.5 px-4 text-center"><span className="text-emerald-600 font-bold">Paid</span></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">Library Fee</td>
                <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">IEEE Xplore, ACM digital library & textbook borrowing rights</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-gray-900 dark:text-white">{formatCurrency(fees.libraryFee)}</td>
                <td className="py-3.5 px-4 text-center"><span className="text-emerald-600 font-bold">Paid</span></td>
              </tr>
              <tr className="bg-gray-50/80 dark:bg-slate-900/60 font-black text-gray-900 dark:text-white">
                <td colSpan={2} className="py-4 px-4 text-right uppercase text-xs">Total Semester Fee</td>
                <td className="py-4 px-4 text-right text-base text-primary-600 dark:text-primary-400 font-mono">
                  {formatCurrency(fees.totalFee)}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
                    Cleared
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Reimbursement Section: Apply Form + Pipeline Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Reimbursement Claim Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card border border-gray-100 dark:border-slate-700 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-primary-600" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Submit Reimbursement
            </h3>
          </div>

          <form onSubmit={handleSubmitClaim} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Claim Title / Activity
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. IEEE Conference Registration or Project Sensor Kit"
                required
                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ReimbursementClaim['category'])}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl"
              >
                <option value="Conference / Workshop">Conference / Workshop</option>
                <option value="Research Paper">Research Paper Publication</option>
                <option value="Project Equipment">Project Equipment / Hardware</option>
                <option value="Books & Materials">Books & Study Materials</option>
                <option value="Competition / Hackathon">Competition / Hackathon Travel</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Claim Amount (INR)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000"
                required
                min={100}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Upload Receipts / Invoices (PDF/Image)
              </label>
              <input
                type="file"
                onChange={(e) => setReceiptFileName(e.target.files?.[0]?.name || null)}
                className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              {receiptFileName && (
                <p className="mt-1 text-[11px] text-emerald-600 font-semibold font-mono">
                  Attached: {receiptFileName}
                </p>
              )}
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Remarks / Department Advisor Endorsement
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add faculty recommendation details..."
                rows={2}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Filing Claim...' : 'File Reimbursement Claim'}</span>
            </button>
          </form>
        </div>

        {/* Reimbursement Claims History Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card border border-gray-100 dark:border-slate-700 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-slate-700 bg-gray-50/70 dark:bg-slate-800/80">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Submitted Reimbursement Claims
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Multi-tier approval pipeline (Advisor → Dean → Bursar Clearance)
            </p>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-100/70 dark:bg-slate-900/60 text-gray-600 dark:text-gray-300 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200 dark:border-slate-700">
                  <th className="py-3 px-4">Claim ID</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 text-right">Amount</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {reimbursements.map((claim) => (
                  <tr key={claim.id} className="hover:bg-blue-50/40 dark:hover:bg-slate-700/30">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary-600 dark:text-primary-400">
                      {claim.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white max-w-xs">
                      {claim.title}
                      {claim.receiptName && (
                        <span className="block text-[10px] text-gray-400 font-mono mt-0.5">
                          📎 {claim.receiptName}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-gray-600 dark:text-gray-400">
                      {claim.category}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-gray-900 dark:text-white">
                      {formatCurrency(claim.amount)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {getReimbursementBadge(claim.status)}
                    </td>
                    <td className="py-3.5 px-3 text-gray-400 font-mono text-[11px] whitespace-nowrap">
                      {claim.appliedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Fee Receipt PDF Modal */}
      <FeeReceiptPDF
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
      />

    </div>
  );
};
