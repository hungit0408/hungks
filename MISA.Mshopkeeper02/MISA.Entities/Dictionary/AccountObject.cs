using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    /// <summary>
    /// Lớp thực thể thể hiện các đối tượng (nhà cung cấp, đối tác giao hàng, khách hàng, nhân viên) trong DB
    /// CreatedBy: NDCong(20/2/2019)
    /// </summary>
    public class AccountObject
    {
        public Guid AccountObjectID { get; set; }

        public int ObjectType { get; set; }

        public string AccountObjectCode { get; set; }

        public string AccountObjectName { get; set; }

        public string AccountObjectAddress { get; set; }

        public string ObjectTypeName
        {
            get
            {
                switch (ObjectType)
                {
                    case 1:
                        return "Nhà cung cấp";
                    case 2:
                        return "Đối tác giao hàng";
                    case 3:
                        return "Khách hàng";
                    case 4:
                        return "Nhân viên";
                    default:
                        return "Khác";
                }
            }
        }
    }
}
