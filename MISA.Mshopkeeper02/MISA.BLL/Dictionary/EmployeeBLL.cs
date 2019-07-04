using MISA.Entities;
using MISA.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DAL.Dictionary;

namespace MISA.BLL.Dictionary
{
    /// <summary>
    /// Lớp Xử lý thao tác giữa controller và tầng DAL của employee
    /// CreatedBy :PDXuan(18/06/2019)
    /// </summary>
    public class EmployeeBLL : IDisposable
    {
        EmployeeDAL _employeeDAL;
        /// <summary>
        /// Hàm khởi tạo của lớp BLL trong đó khởi tạo một đối tượng EmployeeDAL
        /// CreatedBy :PDXuan(18/06/2019)
        /// </summary>
        public EmployeeBLL ()
        {
            _employeeDAL = new EmployeeDAL();
        }  

        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="gender"></param>
        /// <param name="workingStatus"></param>
        /// <param name="employeeCode"></param>
        /// <param name="employeeName"></param>
        /// <param name="mobile"></param>
        /// <param name="birthDate"></param>
        /// <param name="symbol"></param>
        /// <returns></returns>
        public IEnumerable<Employee> GetEmployeesFilter(EmployeeDTO employeeFilter)
        {
            return _employeeDAL.GetListEmployeeFilter(employeeFilter);
        }
        /// <summary>
        /// Hàm trả về Code của nhân viên tạo mới
        /// CreatedBy: PDXuan(20/06/2019)
        /// </summary>
        /// <param name="prefix">Tiền tố của mã nhân viên</param>
        /// <returns></returns>
        public string GetNewEmployeeCode(string prefix)
        {
            return _employeeDAL.GetNewEmployeeCode(prefix);
        }
        /// <summary>
        /// Hàm trả về thông tin cơ bản của nhân viên
        /// CreatedBy: PDXuan(19/06/2019)
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public Employee GetEmployeeById(Guid employeeId)
        {
            return _employeeDAL.GetEmployeeById(employeeId);
        }

        /// <summary>
        /// Hàm xóa một nhân viên theo Id
        /// CreatedBy: PDXuan(19/06/2019)
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public Employee DeleteEmployeeById(Guid employeeId)
        {
            return _employeeDAL.DeleteEmployeeById(employeeId);
        }
        /// <summary>
        /// Hàm lấy vai trò của nhân viên
        /// CreatedBy: PDXuan(20/06/2019)
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public IEnumerable<Employee> GetEmployeeRoleById(Guid employeeId)
        {
            return _employeeDAL.GetEmployeeRoleById(employeeId);
        }

     
        /// <summary>
        /// Hàm thêm mới nhân viên
        /// CreatedBy: PDXuan(20/06/2019)
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public Guid AddEmployee(Employee employee)
        {
            return _employeeDAL.AddEmployee(employee);
        }
        /// <summary>
        /// Hàm thêm mới nhân viên
        /// CreatedBy: PDXuan(20/06/2019)
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public void EditEmployee(Employee employee)
        {
             _employeeDAL.EditEmployee(employee);
        }
        /// <summary>
        /// Hàm  lấy tổng só nhân viên
        /// CreatedBy: PDXuan(22/06/2019)
        /// </summary>
        /// <returns></returns>
        public int GetTotalEmployee(EmployeeDTO employeeFilter)
        {
            return _employeeDAL.GetTotalEmployee(employeeFilter);
        }
        /// <summary>
        /// Phương thức kế thừa từ interface nhằm hủy bỏ các tài nguyên đã cấp phát 
        /// </summary>
        public void Dispose()
        {
            _employeeDAL = null;
        }
    }
}
