import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

const generatePayrollReportPDF = (data) => {
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
            ["Joining Date:", new Date(data.employee.joiningDate).toLocaleDateString()],
            ["Date of Birth:", new Date(data.employee.dob).toLocaleDateString()],
        ];

        let yPosition = 50;
        employeeInfo.forEach((item, index) => {
            const columnPosition = (index % 2 === 0) ? 14 : 110;
            
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
            const columnPosition = (index % 2 === 0) ? 14 : 110; 
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
            ["Start Date:", new Date(data.payrollMonth.startDate).toLocaleDateString()],
            ["End Date:", new Date(data.payrollMonth.endDate).toLocaleDateString()],
        ];

        yPosition += 10;
        payrollMonthInfo.forEach((item, index) => {
            const columnPosition = (index % 2 === 0) ? 14 : 110; 
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

        const allowanceData = data.allowances.map(allowance => [
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

        const deductionData = data.deductions.map(deduction => [
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
        toast.error("Some error occured. Please try again later!", {autoClose: 2000});
    }
};

export default generatePayrollReportPDF;
