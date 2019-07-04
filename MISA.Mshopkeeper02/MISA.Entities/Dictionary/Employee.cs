using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp thực thể đại diện cho nhân viên
    /// CreatedBy: PDXuan(17/06/2019)
    /// </summary>
    public class Employee
    {
        public Guid EmployeeID { get; set; }
        //Mã nhân viên
        public string EmployeeCode { get; set; }
        //Tên nhân viên
        public string EmployeeName { get; set; }
        //giới tính
        private bool _gender;
        //Ngày sinh
        public DateTime? BirthDate { get; set; }
        //Điện thoại di động
        public string Mobile { get; set; }
        //trạng thái lầm việc
        private int _workState;
        //cho phép làm việc với phần mềm
        public bool AllowUseSoftWare { get; set; }
        //Kiểu truy cập
        public bool TypeAcess { get; set; }
        //Trạng thái kết hôn 
        public bool MaritalStatus { get; set; }
        //Vai trò
        public string RoleName { get; set; }
        //List Id của vai trò
        public List<int> RoleIDs { get; set; }
        //Miêu tả vai trò
        public string Description { get; set; }
        //Email
        public string Email { get; set; }
        //Điện thoại nhà riêng
        public string Phone { get; set; }
        //Mật khẩu
        public string Password { get; set; }
        //Chứng minh thư nhân dân
        public string IdentityCard { get; set; }
        //Ngày cấp chứng minh thư
        public DateTime IdentityCarDateProvider { get; set; }
        //Nơi cấp chứng minh thư
        public string IdentityCardProvider { get; set; }
        //Địa chỉ thường trú
        public string NativeAddress { get; set; }
        //Quốc gia
        public string NativeCountry { get; set; }
        //Tỉnh/Tp thường trú
        public string NativeProvince { get; set; }
        //Quuận huyện thường trú
        public string NativeDistrict { get; set; }
        //Xã , phường thường trú
        public string NativeVillage { get; set; }
        //Địa chỉ hiện tại
        public string CurrentAddress { get; set; }
        //Quốc gia hiện tại
        public string CurrentCountry { get; set; }
        //Tỉnh/Tp hiện tại
        public string CurrentProvince { get; set; }
        //Quuận huyện thường trú
        public string CurrentDistrict { get; set; }
        //Xã , phường hiện tại
        public string CurrentVillage { get; set; }
        //admin hay không
        public bool Admin { get; set; }
        //Tiền lương
        public decimal Salary { get; set; }
        //Phí
        public decimal DownPayment { get; set; }
        //Ngày thử việc
        public DateTime? JobtrialDate { get; set; }
        //Ngày chính thức
        public DateTime? JobOfficicalDate { get; set; }
        //Hồ sơ gốc
        public string OriginalDocumentation { get; set; }
        //Tên ảnh 
        public string Avatar { get; set; }
        //Các thứ trong lịch làm việc

        //List Id của vai trò
        public List<int> Days { get; set;}

        public bool Gender
        {
            get { return _gender; }
            set
            {
                _gender = value;
            }
        }

        public string GenderName
        {
            get
            {
                return _gender ? "Nam" : "Nữ";
            }
        }
        //Trạng thái làm việc
        public int WorkingStatus
        {
            get { return _workState; }
            set
            {
                _workState = value;
            }
        }
    
        

        public string WorkSateDisplay
        {
            get
            {
                switch (_workState)
                {
                    case 1:
                        return "Chính thức";
                    case 2:
                        return "Thử việc";
                    case 3:
                        return "Nghỉ việc";
                    default:
                        return "";
                }
            }
        }
       



        /// <summary>
        /// CreatedBy : PDXuan(4/5/2019)
        /// contructor funciton for employee class
        /// </summary>
        public Employee()
        {
        }


    }
}
