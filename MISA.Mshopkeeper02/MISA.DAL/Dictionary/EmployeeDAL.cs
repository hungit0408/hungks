using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;
using System.Data.SqlClient;

namespace MISA.DAL.Dictionary
{
    /// <summary>
    /// Lớp thao tác với dư liệu của nhân viên
    /// CreatedBy: PDXuan(18/06/2019)
    /// </summary>
    public class EmployeeDAL : Base<Employee>
    {
        /// <summary
        /// Hàm đếm tổng số nhân viên
        /// CreatedBy: PDXuan(22/06/2019)
        /// </summary>
        /// <returns></returns>
        public int GetTotalEmployee(EmployeeDTO employeeFilter)
        {
            SqlParameter _pageNumber = new SqlParameter("@PageNumber", employeeFilter.PageNumber);
            SqlParameter _pageSize = new SqlParameter("@PageSize", employeeFilter.PageSize);
            SqlParameter _gender = new SqlParameter("@FilterGender", employeeFilter.FilterGender);
            SqlParameter _workingStatus = new SqlParameter("@FilterWorkingStatus", employeeFilter.FilterWorkingStatus);
            SqlParameter _employeeCode = new SqlParameter("@FilterEmployeeCode", employeeFilter.FilterEmployeeCode);
            SqlParameter _employeeName = new SqlParameter("@FilterEmployeeName", employeeFilter.FilterEmployeeName);
            SqlParameter _mobile = new SqlParameter("@FilterEmployeeMobile", employeeFilter.FilterEmployeeMobile);
            SqlParameter _birthDate = new SqlParameter("@FilterBirthDate", employeeFilter.FilterBirthDate);
            SqlParameter _symbol = new SqlParameter("@FilterCompareSymbol", employeeFilter.FilterCompareSymbol);
            SqlParameter[] sqlParamater = { _pageNumber, _pageSize, _gender, _workingStatus, _employeeCode, _employeeName, _mobile, _birthDate, _symbol };
            var employees = GetEntities("[dbo].[Proc_GetToltalEmployee]", sqlParamater);
            return employees.Count();
        }
        /// <summary>
        /// Hàm lấy dữ liệu theo filter
        /// CreatedBy: PDXuan(24/06/2019)
        /// </summary>
        /// <param name="pageNumber">Trang muốn hiển thị</param>
        /// <param name="pageSize">Số nhân viên muốn hiển thị</param>
        /// <param name="gender">Giói tính muốn filter</param>
        /// <param name="workingStatus">Trạng thái làm việc filter</param>
        /// <param name="employeeCode">Mã nhân viên</param>
        /// <param name="employeeName">Tên nhân viên</param>
        /// <param name="mobile">Điện thoại di động</param>
        /// <param name="birthDate">Ngày sinh</param>
        /// <param name="symbol">Dấu so sánh</param>
        /// <returns></returns>
        public IEnumerable<Employee> GetListEmployeeFilter(EmployeeDTO employeeFilter)
        {
            SqlParameter _pageNumber = new SqlParameter("@PageNumber", employeeFilter.PageNumber);
            SqlParameter _pageSize = new SqlParameter("@PageSize", employeeFilter.PageSize);
            SqlParameter _gender = new SqlParameter("@FilterGender", employeeFilter.FilterGender);
            SqlParameter _workingStatus = new SqlParameter("@FilterWorkingStatus", employeeFilter.FilterWorkingStatus);
            SqlParameter _employeeCode = new SqlParameter("@FilterEmployeeCode", employeeFilter.FilterEmployeeCode);
            SqlParameter _employeeName = new SqlParameter("@FilterEmployeeName", employeeFilter.FilterEmployeeName);
            SqlParameter _mobile = new SqlParameter("@FilterEmployeeMobile", employeeFilter.FilterEmployeeMobile);
            SqlParameter _birthDate = new SqlParameter("@FilterBirthDate", employeeFilter.FilterBirthDate);
            SqlParameter _symbol = new SqlParameter("@FilterCompareSymbol", employeeFilter.FilterCompareSymbol);
            SqlParameter[] sqlParamater = { _pageNumber, _pageSize, _gender, _workingStatus , _employeeCode, _employeeName, _mobile , _birthDate , _symbol };
            return GetEntities("[dbo].[Proc_PaginationFilter2]", sqlParamater);
        }

        /// <summary>
        /// Hàm lấy dữ liệu phân trang
        /// CreatedBy: PDXuan(22/06/2019)
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Employee> GetListEmployees()
        {
            return GetEntities("[dbo].[Proc_GetListEmployees]");
        }


        /// <summary>
        /// Hàm thao tác với dữ liệu gọi procedure lấy dữ liệu của một nhân viên
        /// </summary>
        /// <param name="employeeId">Id của nhân viên cần lấy</param>
        /// <returns></returns>
        public Employee GetEmployeeById(Guid employeeId)
        {
            SqlParameter sqlParameter =  new SqlParameter("@EmployeeID", employeeId) ;
            return GetEntity("[dbo].[Proc_GetEmployeeById]", sqlParameter);
        }
        /// <summary>
        /// Hàm lấy vai trò của nhân viên theo id nhân viên
        /// CreatedBy:PDXuan(18/06/2019)
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public IEnumerable<Employee> GetEmployeeRoleById(Guid employeeId)
        {
            SqlParameter[] sqlParamater = { new SqlParameter("@EmployeeID", employeeId) };
            return GetEntities("[dbo].[Proc_GetRoleById]", sqlParamater);
        }

        /// <summary>
        /// Hàm xóa nhân viên với tham số đầu vào là id của nhân viên
        /// CreatedBy: PDXuan(19/06/2019)
        /// </summary>
        /// <param name="employeeId">Id của nhân viên</param>
        /// <returns></returns>
        public Employee DeleteEmployeeById(Guid employeeId)
        {
            SqlParameter sqlParameter = new SqlParameter("@EmployeeID", employeeId);
            return GetEntity("[dbo].[Proc_DeleteEmployeeById]", sqlParameter);
        }
        /// <summary>
        /// Hàm lấy Id mới của nhân viên 
        /// CreatedBy: PDXuan(20/06/2019)
        /// </summary>
        /// <param name="prefix"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public string GetNewEmployeeCode(string prefix)
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", prefix) ;
            return GetNewCode("[dbo].[Proc_GetNewEmployeeCode]", Prefix);
        }
        /// <summary>
        /// Hàm thêm mới nhân viên
        /// CreatedBy: PDXuan(20/06/2019)
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public Guid AddEmployee(Employee employee)
        {
            var empoyeeID = AddEntities("[dbo].[Proc_AddEmployee]", employee);
            foreach (int employeeRole in employee.RoleIDs)
            {
                SqlParameter employeeId = new SqlParameter("@EmployeeID", empoyeeID);
                SqlParameter _employeeRole = new SqlParameter("@RoleID", employeeRole);
                SqlParameter[] sqlParamater = {employeeId,_employeeRole};
                AddEntities("[dbo].[Proc_AddEmployeeRole]", sqlParamater);                             
            }
            return empoyeeID;
        }
        /// <summary>
        /// Hàm clear vai trò của một nhân viên
        /// CreatedBy: PDXuan922/06/2019)
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public int DeleteEmployeeRole(Guid employeeId)
        {
            SqlParameter sqlParameter = new SqlParameter("@EmployeeID", employeeId);
            return DeleteEntity("[dbo].[Proc_DeleteEmployeeRole]", sqlParameter);
        }

        /// <summary>
        /// Hàm 
        /// </summary>
        /// <param name="employee"></param>
        public void EditEmployee(Employee employee)
        {
            AddEntity("[dbo].[Proc_EditEmployee]", employee);
            DeleteEmployeeRole(employee.EmployeeID);
            foreach (int employeeRole in employee.RoleIDs)
            {
                SqlParameter employeeId = new SqlParameter("@EmployeeID", employee.EmployeeID);
                SqlParameter _employeeRole = new SqlParameter("@RoleID", employeeRole);
                SqlParameter[] sqlParamater = { employeeId, _employeeRole };
                AddEntities("[dbo].[Proc_AddEmployeeRole]", sqlParamater);
            }
        }

    }

}
