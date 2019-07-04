using MISA.Mshopkeeper02.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using MISA.Entities;
using MISA.BLL.Dictionary;
using System.Web;
using System.IO;
using MISA.Mshopkeeper02.Properties;

namespace MISA.Mshopkeeper02.Controllers
{
    [RoutePrefix("employees")]
    public class EmployeeController : ApiController
    {
        /// <summary>
        /// GET: employees
        /// CreatedBy: PDXuan(18/06/2019)
        /// Hàm lấy tổng số nhân viên theo phân trang
        /// </summary>
        /// <param name="pageNumber">Thứ tự của trang</param>
        /// <param name="rowNumber">Số cột hiển thị của 1 trang</param>
        /// <returns>ajaxResult</returns>
        [HttpPost]
        [Route("")]
        public AjaxResult GetEmployees(EmployeeDTO employeeFilters)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (EmployeeBLL employeeBLL = new EmployeeBLL())
                {
                    ajaxResult.Data = employeeBLL.GetTotalEmployee(employeeFilters);
                    ajaxResult.Success = true;
                }
            } catch(Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.GetEmployees;
            }
            return ajaxResult;
        }

        /// <summary>
        /// GET: employees/all
        /// CreatedBy: PDXuan(18/06/2019)
        /// Lấy dữ liệu nhân viên theo tham số truyền vào để phân trang
        /// </summary>
        /// <param name="pageNumber">Thứ tự của trang</param>
        /// <param name="rowNumber">Số cột hiển thị của 1 trang</param>
        /// <returns></returns>
        [HttpPost]
        [Route("all")]
        public AjaxResult FilterByGender(EmployeeDTO employeeFilter)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (EmployeeBLL employeeBLL = new EmployeeBLL())
                {
                    ajaxResult.Data = employeeBLL.GetEmployeesFilter(employeeFilter);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.GetEmployees;
            }
            return ajaxResult;
        }


        /// <summary>
        /// GET : employees/new/prefix
        /// Hàm sinh mã nhân viên tự động
        /// </summary>
        /// <param name="prefix">Tiền tố muốn truyền vào</param>
        /// <returns></returns>
        [HttpGet]
        [Route("new/{prefix}")]
        public AjaxResult GetNewEmployeeCode(string prefix)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (EmployeeBLL employeeBLL = new EmployeeBLL())
                {
                    ajaxResult.Data =  employeeBLL.GetNewEmployeeCode(prefix);
                    ajaxResult.Success = true;
                }
            }
            catch(Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.AddEmployee;
            }

            return ajaxResult;
        }
        /// <summary>
        /// GET: employees/id
        /// CreatedBy :PDXuan(4/5/2019)
        /// Lấy thông tin một nhân viên
        /// </summary>
        /// <param name="employeeId">Id nhân viên</param>
        /// <returns>Nhân viên cần lấy id</returns>
        [HttpGet]
        [Route("{employeeId}")]
        public AjaxResult GetEmployeeById(Guid employeeId)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using(EmployeeBLL employeeBLL = new EmployeeBLL())
                {
                    ajaxResult.Data =  employeeBLL.GetEmployeeById(employeeId);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception )
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.GetEmployees;
            }
            return ajaxResult;
        }
        /// <summary>
        /// GET:employees/role/employeeId
        /// CreatedBy:PDXuan(20/06/2019)
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("role/{employeeId}")]
        public AjaxResult GetEmployeeRoleById(Guid employeeId)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (EmployeeBLL employeeBLL = new EmployeeBLL())
                {
                    ajaxResult.Data = employeeBLL.GetEmployeeRoleById(employeeId);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.GetEmployees;
            }

            return ajaxResult;
        }

        /// <summary>
        /// GET :employees/schedule/employeeid
        /// Hàm lấy lịch làm việc của nhân viên 
        /// CratedBy:PDXuan(26/06/2019)
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("schedule/{employeeId}")]
        public AjaxResult GetWorkSchedule (Guid employeeId)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (WorkScheduleBLL workScheduleBll = new WorkScheduleBLL())
                {
                    ajaxResult.Data = workScheduleBll.GetWorkSchedule(employeeId);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception ex)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.GetEmployees;
            }
            return ajaxResult;
        }



        /// <summary>
        ///  POST: employees/
        /// CreatedBy : PDXuan(13/5/2019)
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên cần thêm</param>
        /// <returns>Nhân viên vừa thêm mới</returns>
        [HttpPost]
        [Route("new/schedule")]
        public AjaxResult AddEmployee([FromBody]WorkSchedule workSchedule)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (WorkScheduleBLL workScheduleBLL = new WorkScheduleBLL())
                {
                    ajaxResult.Data = workScheduleBLL.AddWorkSchedule(workSchedule);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.AddEmployee;
            }
            return ajaxResult;
        }



        /// <summary>
        /// employees/id
        /// CreatedBy :PDXuan(4/5/2019)
        /// Xóa nhân viên 
        /// </summary>
        /// <param name="employeeId">Id nhân viên</param>
        /// <returns>ajaxResult</returns>

        [HttpDelete]
        [Route("{employeeId}")]
        public AjaxResult Delete(Guid employeeId)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (EmployeeBLL employeeBLL = new EmployeeBLL())
                {
                    ajaxResult.Data =  employeeBLL.DeleteEmployeeById(employeeId);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception )
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.DeleteEmployee;
            }
            return ajaxResult;
        }

        /// <summary>
        ///  POST: employees/new
        /// CreatedBy : PDXuan(13/5/2019)
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên cần thêm</param>
        /// <returns>Nhân viên vừa thêm mới</returns>
        [HttpPost]
        [Route("new")]
        public AjaxResult AddEmployee([FromBody]Employee employee)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (EmployeeBLL employeeBLL = new EmployeeBLL())
                {
                    ajaxResult.Data = employeeBLL.AddEmployee(employee);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.AddEmployee;
            }
            return ajaxResult;
        }

        /// <summary>
        ///  POST: employees/update
        /// CreatedBy : PDXuan(13/5/2019)
        /// Sửa thông tin nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên cần sửa</param>
        /// <returns>Nhân viên vừa thêm mới</returns>
        [HttpPut]
        [Route("update")]
        public AjaxResult EditEmployee([FromBody]Employee employee)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (EmployeeBLL employeeBLL = new EmployeeBLL())
                {
                    employeeBLL.EditEmployee(employee);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception )
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.UpdateEmployee;
            }
            return ajaxResult;
        }



        /// <summary>
        ///  POST: employees/update
        /// CreatedBy : PDXuan(13/5/2019)
        /// Sửa thông tin nhân viên
        /// </summary>
        /// <param name="employee">Nhân viên cần sửa</param>
        /// <returns>Nhân viên vừa thêm mới</returns>
        [HttpPut]
        [Route("update/schedule")]
        public AjaxResult EditWorkSchedule([FromBody]WorkSchedule workSchedule)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                using (WorkScheduleBLL workScheduleBLL = new WorkScheduleBLL())
                {
                    workScheduleBLL.EditWorkSchedule(workSchedule);
                    ajaxResult.Success = true;
                }
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.UpdateEmployee;
            }
            return ajaxResult;
        }

        /// <summary>
        /// GET : employees/avatar/upload
        /// Hàm xử lý fileUPload
        /// CreatedBy: PDXuan(25/06/2019)
        /// </summary>
        [HttpPost]
       [Route("avatar/upload")]
        public AjaxResult UploadFile()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    // Get the uploaded image from the Files collection
                    var httpPostedFile = HttpContext.Current.Request.Files[0];

                    if (httpPostedFile != null)
                    {
                        // Get the complete file path
                        var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/UploadedImage"), httpPostedFile.FileName);

                        // Save the uploaded file to "UploadedFiles" folder
                        httpPostedFile.SaveAs(fileSavePath);
                    }
                }
                ajaxResult.Success = true;
            }
            catch(Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.UploadFile;
            }
            return ajaxResult;
        }

    }
}
