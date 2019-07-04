using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MISA.Mshopkeeper02.Controllers
{
    using MISA.BLL;
    using MISA.Entities;
    using MISA.Mshopkeeper02.Models;
    using System.Threading;

    /// <summary>
    /// Lớp controller của trang nhập kho
    /// CreatedBy: NDCong(10/6/2019)
    /// </summary>
    [RoutePrefix("api/inward")]
    public class InwardController : ApiController
    {
        /// <summary>
        /// Lấy thông tin các phiếu nhập kho từ DB có sử dụng phân trang
        /// CreatedBy: NDCong(17/6/2019)
        /// </summary>
        /// <returns></returns>
        [Route("get")]
        [HttpPost]
        public IHttpActionResult GetListRef([FromBody] RefCondition refCondition)
        {
            try
            {
                using (RefInwardBLL refInwardBLL = new RefInwardBLL())
                {
                    var listInward = refInwardBLL.GetListRefInward(refCondition);
                    return Ok(listInward);
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message.ToString());
            }

        }

        /// <summary>
        /// Lấy danh sách các phiếu nhập kho điều chuyển từ cửa hàng khác
        /// CreatedBy: NDCong(22/6/2019)
        /// </summary>
        /// <param name="storeID">ID cửa hàng hiện tại</param>
        /// Filter
        /// <param name="dateForm">Ngày bắt đầu</param>
        /// <param name="dateTo">Ngày kết thúc</param>
        /// <returns></returns>
        [Route("other")]
        [HttpGet]
        public IHttpActionResult GetListRefFromOtherStore(Guid storeID, DateTime dateForm, DateTime dateTo)
        {
            try
            {
                using (RefInwardBLL refInwardBLL = new RefInwardBLL())
                {
                    var listRef = refInwardBLL.GetListRefFromOtherStore(storeID, dateForm, dateTo);
                    return Ok(listRef);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }

        /// <summary>
        /// Hàm lấy thông tin của một phiếu nhập kho
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <returns></returns>
        [Route("{RefID}")]
        [HttpGet]
        public IHttpActionResult GetRef(Guid refID)
        {
            try
            {
                using (RefInwardBLL refInwardBLL = new RefInwardBLL())
                {
                    var refInfor = refInwardBLL.GetRefInfor(refID);
                    return Ok(refInfor);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }

        /// <summary>
        /// Lấy số phiếu mới trong DB
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <returns></returns>
        [Route("new")]
        [HttpGet]
        public IHttpActionResult GetNewRefNo()
        {
            try
            {
                using (RefInwardBLL refInwardBLL = new RefInwardBLL())
                {
                    var newRefNo = refInwardBLL.GetNewRefNo();
                    return Ok(newRefNo);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }

        /// <summary>
        /// Lấy các đối tượng (nhà cung cấp, đối tác giao hàng, khách hàng, nhân viên) có trong DB
        /// CreatedBy: NDCong(20/6/2019)
        /// </summary>
        /// <returns></returns>
        [Route("object")]
        [HttpGet]
        public IHttpActionResult GetListObject(int objectType, string objectFilter)
        {
            try
            {
                using (var objectBLL = new ObjectBLL())
                {
                    var listObject = objectBLL.GetListObject(objectType, objectFilter);
                    return Ok(listObject);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        /// <summary>
        /// Lấy thông tin của một đối tượng (nhà cung cấp, đối tác giao hàng, khách hàng, nhân viên) có trong DB
        /// CreatedBy: NDCong(20/6/2019)
        /// </summary>
        /// <param name="accountObjectID"></param>
        /// <param name="objectType">Loại đối tượng(1: Nhà cung cấp, 2: Đối tác giao hàng, 3: Khách hàng, 4: Nhân viên)</param>
        /// <returns></returns>
        [Route("object/{objectType}/{accountObjectID}")]
        [HttpGet]
        public IHttpActionResult GetObject(Guid accountObjectID, int objectType)
        {
            try
            {
                if (objectType < 1 || objectType > 4)
                {
                    return BadRequest();
                }
                using (var objectBLL = new ObjectBLL())
                {
                    var objectDetail = objectBLL.GetObject(accountObjectID, objectType);
                    return Ok(objectDetail);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }


        /// <summary>
        /// Lấy thông tin chi tiết phiếu
        /// Trả về mảng thông tin chi tiết phiếu
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="refID">ID phiếu cần lấy thông tin chi tiết</param>
        /// <returns></returns>
        [Route("product/{RefID}")]
        [HttpGet]
        public IHttpActionResult GetListProductInRef(Guid refID)
        {
            try
            {
                using (RefDetailBLL refDetailBLL = new RefDetailBLL())
                {
                    var listRefDetail = refDetailBLL.GetRefDetails(refID);
                    return Ok(listRefDetail);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        /// <summary>
        /// Lấy thông tin các nhóm hàng hóa có trong DB
        /// CreatedBy: NDCong(25/06/2019)
        /// </summary>
        /// <returns></returns>
        [Route("itemcategoty")]
        [HttpGet]
        public IHttpActionResult GetListInventoryItemCategory()
        {
            try
            {
                using (InventoryItemCategoryBLL inventoryItemCategoryBLL = new InventoryItemCategoryBLL())
                {
                    var listInventoryItemCatefory = inventoryItemCategoryBLL.GetListInventoryItemCategory();
                    return Ok(listInventoryItemCatefory);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        /// <summary>
        /// Lấy thông tin các hàng hóa có trong DB theo nhóm hàng hóa và từ khóa search
        /// CreatedBy: NDCong(25/06/2019)
        /// </summary>
        /// <param name="inventoryItemCategoyyID">ID nhóm hàng hóa</param>
        /// <param name="filterSearch">từ khóa search</param>
        /// <returns></returns>
        [Route("item")]
        [HttpGet]
        public IHttpActionResult GetListInventoryItem(Guid? inventoryItemCategoryID, string filterSearch)
        {
            try
            {
                using (InventoryItemBLL inventoryItemBLL = new InventoryItemBLL())
                {
                    var listInventoryItem = inventoryItemBLL.GetListIventoryItems(inventoryItemCategoryID, filterSearch);
                    return Ok(listInventoryItem);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        /// <summary>
        /// Lấy thông tin các hàng hóa chi tiết có trong DB từ khóa search
        /// CreatedBy: NDCong(26/06/2019)
        /// </summary>
        /// <param name="filterSearch">từ khóa search</param>
        /// <returns></returns>
        [Route("itemspecify")]
        [HttpGet]
        public IHttpActionResult GetListInventoryItemSpecify(string filterSearch)
        {
            try
            {
                using (InventoryItemBLL inventoryItemBLL = new InventoryItemBLL())
                {
                    var listInventoryItem = inventoryItemBLL.GetListIventoryItems(filterSearch);
                    return Ok(listInventoryItem);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        /// <summary>
        /// Lấy thông tin chi tiết của một hàng háo
        /// </summary>
        /// <param name="inventoryItemID">ID hàng hóa</param>
        /// <returns></returns>
        [Route("item/{inventoryItemID}")]
        [HttpGet]
        public IHttpActionResult GetInventoryItem(Guid inventoryItemID)
        {
            try
            {
                using (InventoryItemBLL inventoryItemBLL = new InventoryItemBLL())
                {
                    var inventoryItem = inventoryItemBLL.GetInventoryItem(inventoryItemID);
                    return Ok(inventoryItem);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        /// <summary>
        /// Thêm phiếu nhập kho
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="refAdd">đối tượng phiếu cần thêm</param>
        /// <returns></returns>
        [Route("")]
        [HttpPost]
        public IHttpActionResult AddRefInward([FromBody] Ref refAdd)
        {
            try
            {
                using (RefInwardBLL refInwardBLL = new RefInwardBLL())
                {
                    var newRefID = refInwardBLL.AddRefInward(refAdd);
                    return Created(Request.RequestUri + "/" + newRefID.ToString(), newRefID);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        /// <summary>
        /// Kiểm tra xem mã phiếu muốn thêm đã có trong DB hay chưa
        /// CreatedBy: NDCong(24/6/2019)
        /// </summary>
        /// <param name="refNo">Mã phiếu cần kiểm tra</param>
        /// <returns></returns>
        [Route("duplicate/{refNo}")]
        [HttpPost]
        public IHttpActionResult CheckDuplicateRefNo(string refNo)
        {
            try
            {
                if (refNo == null)
                {
                    return BadRequest();
                }

                using (RefInwardBLL refInwardBLL = new RefInwardBLL())
                {
                    var isDuplicate = refInwardBLL.CheckDuplicateRefNo(refNo);
                    return Ok(isDuplicate);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        /// <summary>
        /// Hàm xóa phiếu nhập kho
        /// </summary>
        /// <param name="refID">ID phiếu nhập kho</param>
        /// <returns></returns>
        [Route("{refID}")]
        [HttpDelete]
        public IHttpActionResult DeleteRef(Guid refID)
        {
            //Nếu không có id truyền lên trả về BadRequest
            if (refID == null)
            {
                return BadRequest();
            }
            try
            {
                using (RefInwardBLL refInwardBLL = new RefInwardBLL())
                {
                    var result = refInwardBLL.DeleteRef(refID);
                    //Nếu không xóa được dòng nào trả về NotFound
                    if (result <= 0)
                    {
                        return NotFound();
                    }
                    else
                    {
                        return Ok(result);
                    }
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        /// <summary>
        /// Xóa chi tiết phiếu nhập kho
        /// CreatedBy: NDCong(16/6/2019)
        /// </summary>
        /// <param name="refDetailID">ID chi tiết phiếu cần xóa</param>
        /// <returns></returns>
        [Route("product/{refDetailID}")]
        [HttpDelete]
        public IHttpActionResult DeleteRefDetail(Guid refDetailID)
        {
            if (refDetailID == null)
            {
                return BadRequest();
            }
            else
            {
                using (RefDetailBLL refDetailBLL = new RefDetailBLL())
                {
                    var result = refDetailBLL.DeleteRefDetail(refDetailID);

                    if (result <= 0)
                    {
                        return NotFound();
                    }
                    else
                    {
                        return Ok(result);
                    }
                }
            }
        }

        /// <summary>
        /// Sửa thông tin phiêu nhập kho
        /// CreatedBy: NDCong(19/6/2019)
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="editRef"></param>
        /// <param name="refDetails"></param>
        /// <returns></returns>
        [Route("{refID}")]
        [HttpPut]
        public IHttpActionResult EditRefInward(Guid refID, Ref editRef)
        {
            try
            {
                using (RefInwardBLL refInwardBLL = new RefInwardBLL())
                {
                    var result = refInwardBLL.EditRefInward(refID, editRef);
                    if (result <= 0)
                    {
                        return Ok(false);
                    }
                    else
                    {
                        return Ok(true);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }

        }

    }
}
