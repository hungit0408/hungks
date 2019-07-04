using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DAL;
using MISA.Entities;


namespace MISA.BLL
{
    public class RefOutwardBLL : IDisposable
    {
        RefOutwardDAL _refOutwardDAL;
        /// <summary>
        /// Contructor
        /// </summary>
        public RefOutwardBLL()
        {
            _refOutwardDAL = new RefOutwardDAL(); 
        }
        
        /// <summary>
        /// Lấy tất cả dữ liệu phiếu xuất kho từ DB
        /// </summary>
        /// <param name="pageNumber">Số trang hiện tại </param>
        /// <param name="numberRow">Số bản ghi 1 trang</param>
        /// <returns>Danh sách phiếu xuất kho</returns>
        public IEnumerable<Ref> GetListRefOutward(RefCondition refCondition)
        {
            return _refOutwardDAL.GetListRefOutward(refCondition);
        }
        /// <summary>
        /// Lấy dữ liệu một phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho</param>
        /// <returns></returns>
        public Ref GetRefOutward(Guid refID)
        {
            return _refOutwardDAL.GetRefOutward(refID);
        }
        /// <summary>
        /// Thêm mới phiếu xuất kho
        /// </summary>
        /// <param name="refOutward">Thông tin phiếu xuất kho</param>
        /// <returns>ID phiếu xuất kho</returns>
        public Guid AddRefOutward(Ref refOutward)
        {
            var newRefID = _refOutwardDAL.AddRefOutward(refOutward);

            return newRefID;
        }
        /// <summary>
        /// Sửa phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho cần sửa</param>
        /// <param name="refOutward">Phiếu xuất kho</param>
        /// <returns></returns>
        public int EditRefOutward(Guid refID, Ref refOutward)
        {
            return _refOutwardDAL.EditRefOutward(refID, refOutward);
        }
        /// <summary>
        /// Xóa phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho</param>
        /// <returns>Xóa thực thể trên DB</returns>
        public int DeleteRefOutward(Guid refID)
        {
            return _refOutwardDAL.DeleteRefOutward(refID);
        }
        /// <summary>
        /// Tạo mới mã phiếu xuất kho
        /// </summary>
        /// <param name="prefix">Mã code xuất kho "XK"</param>
        /// <returns></returns>
        public string NewOutwardRefNo(string prefix)
        {
            return _refOutwardDAL.NewOutwardRefNo(prefix);
        }

        public int CheckDuplicateCode (string refNo)
        {
            return _refOutwardDAL.CheckDuplicateCode(refNo);
        }


        //public async Task<AjaxResult> AddRefOutward(Ref refOutward)
        //{
        //    var ajaxResult = new AjaxResult();
        //    try
        //    {
        //        ajaxResult = await _refOutwardDAL.AddRefOutward(refOutward);
        //        return ajaxResult;
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        public void Dispose()
        {
            
        }
    }
}
