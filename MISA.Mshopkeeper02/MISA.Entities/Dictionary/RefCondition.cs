using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp biểu diễn điều kiện lấy chứng từ
    /// CreatedBy: NDCong(24/6/2019)
    /// </summary>
    public class RefCondition
    {
        public int PageNumber { get; set; }

        public int NumberRow { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public DateTime? RefDate { get; set; }

        public string RefNo { get; set; }

        public string AccountObjectName { get; set; }

        public decimal? TotalAmount { get; set; }

        public string CompareTotalAmountType { get; set; }

        public string Description { get; set; }

        public int? RefType { get; set; }
    }
}
