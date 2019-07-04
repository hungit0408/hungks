
using MISA.BLL;
using MISA.BLL.Dictionary;
using MISA.Entities;
using MISA.Entities.Dictionary;
using MISA.Mshopkeeper02.Models;
using MISA.Mshopkeeper02.Models.DAL.Repository;
using MISA.Mshopkeeper02.Models.RequestData;
using MISA.Mshopkeeper02.Models.ResponData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
//using AjaxResult = MISA.Mshopkeeper02.Models.AjaxResult;

namespace MISA.Mshopkeeper02.Controllers
{
    public class MoneyFundController : ApiController
    {
        // khai báo repository
        //public VoucherRepository _voucherRepository;
        public ReckoningRepository _reckoningRepository;
        public ObjectRepository _objectRepository;

        // contructor
        //public MoneyFundController(VoucherRepository voucherRepository, ObjectRepository objectRepository, ReckoningRepository reckoningRepository)
        //{
        //    this._voucherRepository = voucherRepository;
        //    this._objectRepository = objectRepository;
        //    this._reckoningRepository = reckoningRepository;
        //}

        // GET: api/getDetailVoucher/5
        /// <summary>
        /// CreatedBy :NNLam(16/5/2019)
        /// Get detail Voucher
        /// </summary>
        /// <returns>AjaxResult</returns>
        [HttpGet]
        [Route("api/VoucherInfo/{id}")]
        public async Task<AjaxResult> GetVoucherInfo(Guid id)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                using (RefVoucherBLL refVoucherBLL = new RefVoucherBLL())
                {
                    var _refVoucher = refVoucherBLL.GetVoucherInfo(id);
                    _ajaxResult.Data = _refVoucher;
                    _ajaxResult.Success = true;
                    _ajaxResult.Message = "thành công";
                }
            }
            catch (Exception)
            {
                // thông báo thất bại
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Lấy dữ liệu thất bại vui lòng liên hệ Misa để được hỗ trợ !";
            }
            //System.Threading.Thread.Sleep(1000);
            return await Task.FromResult<AjaxResult>(_ajaxResult);
        }

        // GET: api/getListReckoningByVoucherId/5
        // thông tin chi tiết trong popup xem chi tiết phiếu
        /// <summary>
        /// CreatedBy :NNLam(17/5/2019)
        /// Get list Reckoning by voucher id
        /// </summary>
        /// <returns>AjaxResult</returns>
        [HttpGet]
        [Route("api/getListReckoningByVoucherId/{id}")]
        public async Task<AjaxResult> GetListReckoningByVoucherId(Guid id)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                RefVoucherBLL refVoucherBLL = new RefVoucherBLL();
                RefVoucherDetailBLL refVoucherDetailBLL = new RefVoucherDetailBLL();
                ObjectBLL objectBLL = new ObjectBLL();
                Ref _refVoucher = refVoucherBLL.GetRefVoucherById(id);
                // get tên đối tượng
                var accountObject = objectBLL.GetObject(_refVoucher.AccountObjectID, _refVoucher.ObjectType);
                List<RefDetail> _voucherDetail = refVoucherDetailBLL.GetRefVoucherDetailById(_refVoucher.RefID).ToList();
                var _voucherResponse = new VoucherResponse(_refVoucher, (AccountObject)accountObject);
                List<Voucher> vouchers = new List<Voucher>();
                foreach (RefDetail refDetail in _voucherDetail)
                {
                    var voucher = new Voucher(refDetail, _refVoucher.AccountObjectCode);
                    vouchers.Add(voucher);
                }
                _voucherResponse.vouchers = vouchers;
                _ajaxResult.Data = _voucherResponse;
                _ajaxResult.Success = true;
                _ajaxResult.Message = "thành công";
            }
            catch (Exception ex)
            {
                // thông báo thất bại
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Lấy dữ liệu thất bại vui lòng liên hệ Misa để được hỗ trợ !";
            }
            return await Task.FromResult<AjaxResult>(_ajaxResult);
        }

        // POST: api/refVoucherNew
        /// <summary>
        /// CreatedBy :NNLam(20/5/2019)
        /// thêm dữ liệu voucher
        /// </summary>
        /// <returns>AjaxResult</returns>
        [HttpPost]
        [Route("api/refVoucherNew")]
        public async Task<AjaxResult> InsertVoucher([FromBody] VoucherRequest voucherRequest)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                using (RefVoucherBLL refVoucherBLL = new RefVoucherBLL())
                {
                    var _checkVali = refVoucherBLL.CheckDuplicateRefNo(voucherRequest.refVoucher.RefNo);
                    if (_checkVali)
                    {
                        var _refVoucherId = refVoucherBLL.InsertRefVoucher(voucherRequest.refVoucher);
                        RefVoucherDetailBLL refVoucherDetailBLL = new RefVoucherDetailBLL();
                        foreach (var refDetail in voucherRequest.refDetails)
                        {
                            var createRefDate = DateTime.Parse(voucherRequest.createRefDate);
                            refDetail.CreateRefDate = createRefDate;
                            var refVoucherDetailId = refVoucherDetailBLL.InsertRefDetail(refDetail, _refVoucherId);
                        }
                        _ajaxResult.Success = true;
                        _ajaxResult.Message = "thành công";
                    }
                    else
                    {
                        _ajaxResult.Success = false;
                        _ajaxResult.Message = "mã lỗi bị trùng";
                    }
                }
            }
            catch (Exception ex)
            {
                /// xử lý ex ở đây
                /// ghi log ở đây
                // thông báo thất bại
                _ajaxResult.Success = false;
                _ajaxResult.Message = "insert dữ liệu thất bại vui lòng liên hệ Misa để được hỗ trợ !";
            }
            return await Task.FromResult<AjaxResult>(_ajaxResult);
        }

        // POST: api/editRefVoucher
        /// <summary>
        /// CreatedBy :NNLam(20/5/2019)
        /// thêm dữ liệu voucher
        /// </summary>
        /// <returns>AjaxResult</returns>
        [HttpPut]
        [Route("api/editRefVoucher")]
        public async Task<AjaxResult> EditVoucher([FromBody] VoucherRequest voucherRequest)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                using (RefVoucherBLL refVoucherBLL = new RefVoucherBLL())
                {
                    var _checkVali = refVoucherBLL.CheckDuplicateRefNo(voucherRequest.refVoucher.RefNo);
                    if (_checkVali)
                    {
                        refVoucherBLL.EditRefVoucher(voucherRequest.refVoucher);
                        RefVoucherDetailBLL refVoucherDetailBLL = new RefVoucherDetailBLL();
                        foreach (var refDetail in voucherRequest.refDetails)
                        {
                            refVoucherDetailBLL.EditRefDetail(refDetail);
                        }
                        _ajaxResult.Success = true;
                        _ajaxResult.Message = "thành công";
                    }
                    else
                    {
                        _ajaxResult.Success = false;
                        _ajaxResult.Message = "mã lỗi bị trùng";
                    }
                }
            }
            catch (Exception)
            {
                /// xử lý ex ở đây
                /// ghi log ở đây
                // thông báo thất bại
                _ajaxResult.Success = false;
                _ajaxResult.Message = "edit dữ liệu thất bại vui lòng liên hệ Misa để được hỗ trợ !";
            }
            return await Task.FromResult<AjaxResult>(_ajaxResult);
        }

        [HttpDelete]
        [Route("api/refVoucherRemove/{refID}")]
        public async Task<AjaxResult> DeleteVoucher(Guid refID)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                using (RefVoucherBLL refVoucherBLL = new RefVoucherBLL())
                {
                    refVoucherBLL.DeleteRefVoucher(refID);
                    //_voucherRepository.Delete(id);
                    _ajaxResult.Success = true;
                    _ajaxResult.Message = "thành công";
                }
            }
            catch (Exception ex)
            {
                // thông báo thất bại
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Xóa dữ liệu thất bại vui lòng liên hệ Misa để được hỗ trợ !";
            }
            return await Task.FromResult<AjaxResult>(_ajaxResult);
        }

        /// <summary>
        /// lọc danh sách phiếu thu chi theo khoảng tg
        /// CreatedBy: NNLam(17/6/2019)
        /// </summary>
        /// <param name="FilterVoucherByTimeRequest"></param>
        /// <returns>AjaxResult</returns>
        [HttpPut]
        [Route("api/filterVoucherByTime")]
        public async Task<AjaxResult> FilterVoucherByTime(FilterVoucherByTimeRequest request)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                using (RefVoucherBLL refVoucherBLL = new RefVoucherBLL())
                {
                    var startDate = DateTime.Parse("" + request.startDate);
                    var endDate = DateTime.Parse("" + request.endDate);
                    var _listVoucher = refVoucherBLL.FilterVouchersByTime(request.pageNumber, request.numberRow, startDate, endDate);
                    // thao tác add vào ajaxResult và thông báo thành công
                    _ajaxResult.Data = _listVoucher;
                    _ajaxResult.Success = true;
                    _ajaxResult.Message = "thành công";
                }
            }
            catch (Exception ex)
            {
                // thông báo thất bại
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Xóa dữ liệu thất bại vui lòng liên hệ Misa để được hỗ trợ !";
            }
            return await Task.FromResult<AjaxResult>(_ajaxResult);
        }

        /// <summary>
        /// Lấy thông tin các phiếu Thu chi từ DB có sử dụng phân trang
        /// CreatedBy: NNLam(17/6/2019)
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="numberRow"></param>
        /// <returns>AjaxResult</returns>
        [Route("api/vouchers")]
        [HttpPost]
        public async Task<AjaxResult> GetListVoucher([FromBody] FilterVoucherRequest filterVoucherRequest)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                using (RefVoucherBLL refVoucherBLL = new RefVoucherBLL())
                {
                    //filterVoucherRequest.DateFrom = null;
                    var _listVoucher = refVoucherBLL.GetListRefVoucher(filterVoucherRequest);
                    _ajaxResult.Data = _listVoucher;
                    _ajaxResult.Success = true;
                    _ajaxResult.Message = "thành công";
                }
            }
            catch (Exception ex)
            {
                // thông báo thất bại
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Lấy dữ liệu thất bại vui lòng liên hệ Misa để được hỗ trợ !";
            }
            System.Threading.Thread.Sleep(1000);
            return await Task.FromResult<AjaxResult>(_ajaxResult);

        }

        /// <summary>
        /// Lấy các đối tượng (nhà cung cấp, đối tác giao hàng, khách hàng, nhân viên) có trong DB
        /// CreatedBy: NNLam(25/6/2019)
        /// </summary>
        /// <returns></returns>
        [Route("api/listObjects")]
        [HttpPut]
        public async Task<AjaxResult> ListObject([FromBody] ObjectRequest objectRequest)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                using (var objectBLL = new ObjectBLL())
                {
                    var _listObject = objectBLL.GetListObject(objectRequest.objectType, objectRequest.objectFilter);
                    _ajaxResult.Data = _listObject;
                    _ajaxResult.Success = true;
                    _ajaxResult.Message = "thành công";
                }
            }
            catch (Exception ex)
            {
                // thông báo thất bại
                _ajaxResult.Success = false;
                _ajaxResult.Message = "Lấy dữ liệu thất bại vui lòng liên hệ Misa để được hỗ trợ !";
            }
            return await Task.FromResult<AjaxResult>(_ajaxResult);
        }
    }
}
