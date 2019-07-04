using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class EmployeeDTO
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int FilterGender { get; set; }
        public int FilterWorkingStatus { get; set; }
        public string FilterEmployeeCode { get; set; }
        public string FilterEmployeeName { get; set; }
        public string FilterEmployeeMobile { get; set; }
        public DateTime ? FilterBirthDate { get; set; }
        public string FilterCompareSymbol { get; set; }
        public EmployeeDTO()
        {

        }
        
    }
}
