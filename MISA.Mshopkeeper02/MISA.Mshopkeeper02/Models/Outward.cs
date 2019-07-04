using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models
{
    public class Outward
    {
        private Guid voucherID;
        private string voucherCode;
        private DateTime dateOutward;
        private int totalMoney;
        private string explain;
        private string receiverName;
        private int typeVoucher;
        /// <summary>
        /// Lớp xuất kho
        /// Created date: 24/05/2019
        /// author: PMDUC
        /// </summary>

        public static List<Outward> Outwards = new List<Outward>(){
                new Outward(Guid.NewGuid(), DateTime.Now ,"XK00001", 1000000, "Phan Minh Đức", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00002", 10000000, "Đoàn Trung Hiếu", "Xuất hàng theo hóa đơn số 19002002", 2),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00003", 10432000, "Trần Văn Phương", "Xuất hàng theo hóa đơn số 19002004", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00004", 10004230, "Nguyễn Mậu Đức Huy", "Xuất hàng theo hóa đơn số 19002003", 3),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00005", 10053200, "Nguyễn Đức Công", "Xuất hàng theo hóa đơn số 19002006", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00006", 1000004230, "Nguyễn Ngọc Lâm", "Xuất hàng theo hóa đơn số 19002009", 4),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00007", 10000420, "Phùng Đình Xuân", "Xuất hàng theo hóa đơn số 19002010", 3),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00008", 1000050, "Nguyễn Đình Hiếu", "Xuất hàng theo hóa đơn số 19002005", 2),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00009", 10032500, "Nguyễn Trung Hiếu", "Xuất hàng theo hóa đơn số 19002007", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00010", 1530300, "Nguyễn Văn Lâm", "Xuất hàng theo hóa đơn số 19002008", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00011", 10026200, "Nguyễn Ngọc Hóa", "Xuất hàng theo hóa đơn số 19002011", 2),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00012", 15432500, "Trần Trọng Hiếu", "Xuất hàng theo hóa đơn số 19002012", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00013", 104200, "Hà Quang Thụy", "Xuất hàng theo hóa đơn số 19002013", 4),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00014", 152520000, "Nguyễn Hồng Hải", "Xuất hàng theo hóa đơn số 19002015", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00015", 423400000, "Nguyễn Thị Hậu", "Xuất hàng theo hóa đơn số 19002014", 4),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00016", 1000342100, "Nguyễn Thị Cẩm Vân", "Xuất hàng theo hóa đơn số 19002016", 3),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00017", 105234230, "Nguyễn Minh Nhã", "Xuất hàng theo hóa đơn số 19002018", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00018", 1034520, "Lỗ Đức Minh", "Xuất hàng theo hóa đơn số 19002017", 2),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00019", 154350, "Dư Phương Hạnh", "Xuất hàng theo hóa đơn số 19002020", 3),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00020", 10532420, "Nguyễn Phương Nam", "Xuất hàng theo hóa đơn số 19002019", 2),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00021", 104230, "Nguyễn Hà Nam", "Xuất hàng theo hóa đơn số 19002021", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00022", 15234500, "Lê Phê Đô", "Xuất hàng theo hóa đơn số 19002022", 3),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00023", 15430, "Phan Minh Đức", "Xuất hàng theo hóa đơn số 19002023", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00024", 1000000, "Nguyễn Mậu Đức Huy", "Xuất hàng theo hóa đơn số 19002024", 3),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00025", 16434300, "Lỗ Đức Minh", "Xuất hàng theo hóa đơn số 19002025", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00026", 152320, "Trần Trọng Hiếu", "Xuất hàng theo hóa đơn số 19002026", 4),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00027", 15643500, "Trần Văn Phương", "Xuất hàng theo hóa đơn số 19002027", 4),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00028", 1000000, "Trần Trọng Hiếu", "Xuất hàng theo hóa đơn số 19002028", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00029", 1006430, "Nguyễn Đức Công", "Xuất hàng theo hóa đơn số 19002029", 4),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00030", 10653530, "Lỗ Đức Minh", "Xuất hàng theo hóa đơn số 19002030", 3),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00031", 1005345, "Nguyễn Văn Lâm", "Xuất hàng theo hóa đơn số 19002031", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00032", 1005340, "Trần Trọng Hiếu", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00033", 10005340, "Nguyễn Mậu Đức Huy", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00034", 1053400, "Nguyễn Văn Lâm", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00035", 15430000, "Trần Trọng Hiếu", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00036", 10053450, "Nguyễn Hà Nam", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00037", 1000054300, "Lỗ Đức Minh", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00038", 1000534000, "Dư Phương Hạnh", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00039", 1005340, "Nguyễn Thị Cẩm Vân", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00040", 10053450, "Trần Văn Phương", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00041", 10005435, "Nguyễn Thị Cẩm Vân", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00042", 1000543, "Nguyễn Đình Hiếu", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00043", 100534, "Phan Minh Đức", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00044", 1005340, "Nguyễn Đình Hiếu", "Xuất hàng theo hóa đơn số 19002001", 1),
                new Outward(Guid.NewGuid(), DateTime.Now, "XK00045", 10054360, "Nguyễn Đức Công", "Xuất hàng theo hóa đơn số 19002001", 1)
            };

        #region Constructors
        /// <summary>
        /// Hàm khởi tạo
        /// Created by:PMDUC
        /// Created date:(24/05/2019)
        public Outward()
        {

        }
        /// </summary>
        /// <param name="voucherID">ID chứng từ</param>
        /// <param name="dateOutward">Ngày xuất kho</param>
        /// <param name="totalMoney">Tổng tiền</param>
        /// <param name="explain">Diễn giải</param>
        /// <param name="receiverName">Tên nhà cung cấp</param>
        /// <param name="typeVoucher">Loại chứng từ</param>
        public Outward (Guid voucherID, DateTime dateOutward,string voucherCode, int totalMoney, string receiverName, string explain,  int typeVoucher)
        {
            //VoucherID = voucherID;
            //DateOutward = dateOutward;
            //VoucherCode = voucherCode;
            //TotalMoney = totalMoney;
            //Explain = explain;
            //ReceiverName = receiverName;
            //TypeVoucher = typeVoucher;
            
        }
        public string TypeVoucherName
        {
            get
            {
                switch (TypeVoucher)
                {
                    case 0:
                        return "Phiếu xuất kho bán hàng";
                    case 1:
                        return "Phiếu trả lại hàng mua - Tiền mặt";
                    case 2:
                        return "Phiếu trả lại hàng mua - Tiền gửi";
                    case 3:
                        return "Phiếu trả lại hàng mua - Giảm trừ công nợ";
                    case 4:
                        return "Phiếu xuất kho kiểm kê";
                    case 5:
                        return "Phiếu xuất kho điều chuyển sang cửa hàng khác";
                    default:
                        return "Phiếu xuất kho khác";
                }
            }
        }

        public Guid VoucherID { get; set; }
        public DateTime DateOutward { get ; set; }
        public string VoucherCode { get; set ; }
        public int TotalMoney { get ; set ; }
        public string Explain { get; set; }
        public string ReceiverName { get ; set; }
        public int TypeVoucher { get ; set ; }

        #endregion

      

        #region Methods
        //public static List<Outward> ListOutwards()
        //{
        //    string[] explain = {"Xuất kho bán hàng theo hóa đơn 19001201", "Xuất kho bán hàng theo hóa đơn số 19001200", "Xuất kho kiểm kê", "Xuất kho khác" };
        //    string[] receiverName = { "Trần Văn Phương", "Lê Lương Tuấn Anh", "Đoàn Trung Hiếu", "Phùng Đình Xuân", "Nguyễn Đức Công" };
        //    int[] typeVoucher = { 0, 1, 2, 3, 4, 5 };
        //    for (int i = 0; i < 20; i++)
        //    {
        //        Random rd = new Random(Guid.NewGuid().GetHashCode());
        //        var outward = new Outward();
        //        outward.VoucherID = Guid.NewGuid();
        //        outward.DateOutward = new DateTime(rd.Next(2016, 2019), rd.Next(1, 13), rd.Next(1, 29));
        //        string NewVoucherCode = string.Concat("00000", i+1);
        //        NewVoucherCode = string.Concat("XK", NewVoucherCode.Substring(NewVoucherCode.Length - 6, 6));
        //        outward.VoucherCode = NewVoucherCode;
        //        outward.TotalMoney = 1000000;
        //        outward.Explain = explain[rd.Next(1, 4)];
        //        outward.ReceiverName = receiverName[rd.Next(0, 5)];
        //        outward.TypeVoucher = typeVoucher[rd.Next(1, 6)];
        //        outwards.Add(outward);
        //    }
        //}
        #endregion
    }
}