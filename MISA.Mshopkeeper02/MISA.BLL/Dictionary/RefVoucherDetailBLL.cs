using MISA.DAL.Dictionary;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BLL.Dictionary
{
    public class RefVoucherDetailBLL: IDisposable
    {
        private RefVoucherDetailDAL _refVoucherDetailDAL;

        public RefVoucherDetailBLL()
        {
            _refVoucherDetailDAL = new RefVoucherDetailDAL();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public Guid InsertRefDetail(RefDetail refDetail, Guid refVoucherId)
        {
            refDetail.RefID = refVoucherId;
            return _refVoucherDetailDAL.InsertRefDetail(refDetail);
        }

        public void EditRefDetail(RefDetail refDetail)
        {
            _refVoucherDetailDAL.EditRefDetail(refDetail);
        }

        public IEnumerable<RefDetail> GetRefVoucherDetailById(Guid refID)
        {
            return _refVoucherDetailDAL.GetRefVoucherDetailById(refID);
        }
    }
}
