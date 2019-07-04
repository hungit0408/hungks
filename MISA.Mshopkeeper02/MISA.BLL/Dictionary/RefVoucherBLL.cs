using MISA.DAL.Dictionary;
using MISA.Entities;
using MISA.Mshopkeeper02.Models.RequestData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BLL.Dictionary
{
    public class RefVoucherBLL : IDisposable
    {
        RefVoucherDAL _refVoucherDAL;
        public RefVoucherBLL()
        {
            _refVoucherDAL = new RefVoucherDAL();
        }

        public IEnumerable<Ref> GetListRefVoucher(FilterVoucherRequest filterVoucherRequest)
        {
            return _refVoucherDAL.GetListRefVoucher(filterVoucherRequest);
        }

        public Ref GetVoucherInfo(Guid refID)
        {
            return _refVoucherDAL.GetVoucherInfo(refID);
        }
        public Ref GetRefVoucherById(Guid refID)
        {
            return _refVoucherDAL.GetRefVoucherById(refID);
        }
        public bool CheckDuplicateRefNo(string refNo)
        {
            return _refVoucherDAL.CheckDuplicateRefNo(refNo);
        }

        public Guid InsertRefVoucher(Ref refVoucher)
        {
            return _refVoucherDAL.InsertRefVoucher(refVoucher);
        }
        public int EditRefVoucher(Ref refVoucher)
        {
            return _refVoucherDAL.EditRefVoucher(refVoucher);
        }
        public int DeleteRefVoucher(Guid refId)
        {
           return _refVoucherDAL.DeleteRefVoucher(refId);
        }
        public IEnumerable<Ref> FilterVouchersByTime( int pageNumber, int numberRow, DateTime startDate, DateTime endDate)
        {
            return _refVoucherDAL.FilterVouchersByTime(pageNumber, numberRow, startDate, endDate);
        }
        public void Dispose()
        {
            _refVoucherDAL = null;
        }
    }
}
