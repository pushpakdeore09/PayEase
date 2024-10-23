import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

export const generatePayrollReportPDF = (data) => {
  try {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setFont("Helvetica", "bold");
    doc.text("Payroll Report", 14, 20);

    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Employee Details:", 14, 40);

    const employeeInfo = [
      ["Employee ID:", String(data.employee.employeeId)],
      ["Name:", `${data.employee.firstName} ${data.employee.lastName}`],
      ["Gender:", data.employee.gender],
      ["Email:", data.employee.email],
      ["Address:", data.employee.address],
      ["Base Salary:", `Rs. ${String(data.employee.baseSalary)}`],
      ["Net Salary:", `Rs. ${String(data.employee.netSalary)}`],
      ["Employee Type:", data.employee.employeeType],
      ["Designation:", data.employee.designation],
      [
        "Joining Date:",
        new Date(data.employee.joiningDate).toLocaleDateString(),
      ],
      ["Date of Birth:", new Date(data.employee.dob).toLocaleDateString()],
    ];

    let yPosition = 50;
    employeeInfo.forEach((item, index) => {
      const columnPosition = index % 2 === 0 ? 14 : 110;

      doc.setTextColor(0, 102, 204);
      doc.setFontSize(12);
      doc.text(item[0], columnPosition, yPosition);

      doc.setTextColor(0, 0, 0);
      doc.text(item[1], columnPosition + 50, yPosition);

      if (index % 2 === 1) {
        yPosition += 8;
      }
    });

    yPosition += 20;
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Department Details:", 14, yPosition);
    const departmentInfo = [
      ["Department ID:", String(data.department.deptId)],
      ["Department Name:", data.department.deptName],
      ["Employee Count:", String(data.department.employeeCount)],
    ];

    yPosition += 10;
    departmentInfo.forEach((item, index) => {
      const columnPosition = index % 2 === 0 ? 14 : 110;
      doc.setTextColor(0, 102, 204);
      doc.setFontSize(12);
      doc.text(item[0], columnPosition, yPosition);

      doc.setTextColor(0, 0, 0);
      doc.text(item[1], columnPosition + 50, yPosition);

      if (index % 2 === 1) {
        yPosition += 10;
      }
    });

    yPosition += 20;
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Payroll Month Details:", 14, yPosition);
    const payrollMonthInfo = [
      ["Month Name:", data.payrollMonth.monthName],
      ["Year:", String(data.payrollMonth.year)],
      [
        "Start Date:",
        new Date(data.payrollMonth.startDate).toLocaleDateString(),
      ],
      ["End Date:", new Date(data.payrollMonth.endDate).toLocaleDateString()],
    ];

    yPosition += 10;
    payrollMonthInfo.forEach((item, index) => {
      const columnPosition = index % 2 === 0 ? 14 : 110;
      doc.setTextColor(0, 102, 204);
      doc.setFontSize(12);
      doc.text(item[0], columnPosition, yPosition);

      doc.setTextColor(0, 0, 0);
      doc.text(item[1], columnPosition + 50, yPosition);

      if (index % 2 === 1) {
        yPosition += 10;
      }
    });

    yPosition += 20;
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Allowances:", 14, yPosition);

    const allowanceData = data.allowances.map((allowance) => [
      allowance.allowanceName,
      allowance.allowanceType,
      `${allowance.allowancePercentage}%`,
      String(allowance.allowanceAmount),
    ]);

    doc.autoTable({
      head: [["Allowance Name", "Allowance Type", "Percentage", "Amount"]],
      body: allowanceData,
      startY: yPosition + 10,
    });

    yPosition = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Deductions:", 14, yPosition);

    const deductionData = data.deductions.map((deduction) => [
      deduction.deductionName,
      deduction.deductionType,
      `${deduction.deductionPercentage}%`,
      String(deduction.deductionAmount),
    ]);

    doc.autoTable({
      head: [["Deduction Name", "Deduction Type", "Percentage", "Amount"]],
      body: deductionData,
      startY: yPosition + 10,
    });

    doc.save(`${data.employee.firstName} ${data.employee.lastName}.pdf`);
  } catch (error) {
    toast.error("Some error occured. Please try again later!", {
      autoClose: 2000,
    });
  }
};

export const generatePayslipPDF = (data) => {
  try {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(16);
    doc.text("Payslip", 105, 20, { align: "center" });
    doc.setFontSize(12);

    // Employee and Payroll details
    const employeeDetails = [
      [
        "Employee Name",
        `${data.employee.firstName} ${data.employee.lastName}`,
        "Date of Joining",
        new Date(data.employee.joiningDate).toLocaleDateString(),
      ],
      [
        "Pay Period",
        `${data.payrollMonth.monthName} ${data.payrollMonth.year}`,
        "Designation",
        data.employee.designation,
      ],
      [
        "Employee Id",
        `${data.employee.employeeId}`,
        "Department",
        `${data.employee.department.deptName}`,
      ]
    ];

    let yPosition = 50;
    employeeDetails.forEach(([label1, value1, label2, value2]) => {
      doc.text(label1 + " :", 20, yPosition);
      doc.text(value1, 70, yPosition);
      doc.text(label2 + " :", 120, yPosition);
      doc.text(value2, 160, yPosition);
      yPosition += 10;
    });

    // Preparing Earnings and Deductions
    const earnings =
      data.allowances?.map((item) => [
        item.allowanceName || "N/A", // Fallback if allowanceName is undefined
        item.allowanceAmount != null ? item.allowanceAmount.toString() : "0", // Fallback if allowanceAmount is undefined
      ]) || []; // Fallback to empty array if data.allowances is undefined

    const deductions =
      data.deductions?.map((item) => [
        item.deductionName || "N/A", // Fallback if name is undefined
        item.deductionAmount != null ? item.deductionAmount.toString() : "0", // Fallback if amount is undefined
      ]) || []; // Fallback to empty array if data.deductions is undefined

    // Add taxes to deductions
    const taxes =
      data.taxes?.map((item) => [
        item.taxName || "N/A", // Fallback if taxName is undefined
        item.taxAmount != null ? item.taxAmount.toString() : "0", // Fallback if taxAmount is undefined
      ]) || []; // Fallback to empty array if data.taxes is undefined

    // Combine deductions and taxes
    const combinedDeductions = [...deductions, ...taxes];

    // AutoTable for Earnings and Deductions
    const rows = earnings.map((earning, index) => {
      const deduction = combinedDeductions[index] || ["", ""]; // Fallback for undefined deductions
      return [
        earning[0], // Earnings name
        earning[1], // Earnings amount
        deduction[0], // Deductions name (optional)
        deduction[1], // Deductions amount (optional)
      ];
    });

    // Fill any remaining combined deductions that don't have corresponding earnings
    if (combinedDeductions.length > earnings.length) {
      for (let i = earnings.length; i < combinedDeductions.length; i++) {
        const deduction = combinedDeductions[i];
        rows.push(["", "", deduction[0], deduction[1]]);
      }
    }

    doc.autoTable({
      head: [["Allowances", "Amount", "Deductions", "Amount"]],
      body: rows,
      startY: yPosition + 10,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: "auto", halign: "left" },
        1: { cellWidth: 30, halign: "right" },
        2: { cellWidth: "auto", halign: "left" },
        3: { cellWidth: 30, halign: "right" },
      },
      margin: { top: 10, left: 20, right: 20 },
      tableWidth: "auto",
      pageBreak: "auto",
    });

    // Calculate totals
    const totalEarnings = data.allowances.reduce(
      (sum, item) => sum + (item.allowanceAmount || 0),
      0
    );

    const totalDeductions = combinedDeductions.reduce((sum, item) => {
      const amount = parseFloat(item[1].replace(/,/g, ""));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    const netSalary = data.employee.netSalary;
    const baseSalary = data.employee.baseSalary;

    // Add totals after the table
    yPosition = doc.autoTable.previous.finalY + 10;
    doc.text(`Total Allowances: ${totalEarnings}`, 20, yPosition);
    doc.text(`Total Deductions: ${totalDeductions}`, 105, yPosition);
    doc.text(`Base Salary: ${baseSalary}`, 20, yPosition + 15);
    doc.text(`Net Salary: ${netSalary}`, 105, yPosition + 15);

    // Add signatures
    yPosition += 40;
    doc.text("Employer Signature", 40, yPosition);
    doc.text("Employee Signature", 150, yPosition);
    doc.line(30, yPosition - 5, 80, yPosition - 5);
    doc.line(140, yPosition - 5, 190, yPosition - 5);

    // Footer
    yPosition += 20;
    doc.text("This is a system-generated payslip", 105, yPosition, {
      align: "center",
    });

    // Save the PDF
    doc.save(
      `${data.employee.firstName}_${data.employee.lastName}_Payslip.pdf`
    );
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
