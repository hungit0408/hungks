using MISA.BLL;
using MISA.Entities;
using MISA.Mshopkeeper02.Properties;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Http;
using MISA.Mshopkeeper02.Models;


namespace MISA.Mshopkeeper02.Controllers
{
    [RoutePrefix("outwards")]
    public class OutwardController : ApiController
    {
        //List<Outward> _outwards = new List<Outward>();

        /// <summary>
        /// Lấy tất cả dữ liệu phiếu xuất kho
        /// </summary>
        /// <returns>dữ liệu trả về là phiếu xuất kho</returns>
        /// author:PMDUC(25/05/2019)


        [HttpPost]
        [Route("getDb")]
        public IHttpActionResult GetListRefOutward(RefCondition refCondition)
        {
            try
            {
                using (RefOutwardBLL refOutwardBLL = new RefOutwardBLL())
                {
                    var listRefOutward = refOutwardBLL.GetListRefOutward(refCondition);
                    return Ok(listRefOutward);
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message.ToString());
            }


        }
        /// <summary>
        /// Lấy dữ liệu một phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho</param>
        /// <returns>Dữ liệu phiếu xuất kho</returns>
        /// Created by: PMDUC
        [HttpGet]
        [Route("{RefID}")]
        public IHttpActionResult GetRefOutward(Guid refID)
        {

            try
            {
                using (RefOutwardBLL refOutwardBLL = new RefOutwardBLL())
                {
                    var refOutward = refOutwardBLL.GetRefOutward(refID);
                    return Ok(refOutward);

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        /// <summary>
        /// Thêm mới phiếu xuất kho
        /// </summary>
        /// <param name="refAdd">Dữ liệu phiếu xuất kho </param>
        /// <returns></returns>
        /// Created by:PMDUC
        [HttpPost]
        [Route("new")]

        public IHttpActionResult AddRef([FromBody] Ref refAdd)
        {
            try
            {
                using (RefOutwardBLL refOutwardBLL = new RefOutwardBLL())
                {
                    var newRefID = refOutwardBLL.AddRefOutward(refAdd);

                    return Created(Request.RequestUri + "/" + newRefID.ToString(), newRefID);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        /// <summary>
        /// Sửa phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho</param>
        /// <param name="refOutward">Thông tin phiếu xuất kho</param>
        /// <returns></returns>
        /// Created by:PMDUC
        [HttpPut]
        [Route("edit/{RefID}")]
        public IHttpActionResult EditRefOutward(Guid refID, [FromBody] Ref refOutward)
        {
            try
            {
                using (RefOutwardBLL refOutwardBLL = new RefOutwardBLL())
                {
                    var result = refOutwardBLL.EditRefOutward(refID, refOutward);
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
                throw;
            }
        }
        /// <summary>
        /// Xóa phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho</param>
        /// <returns></returns>
        /// Created by:PMDUC
        [HttpDelete]
        [Route("Delete/{refID}")]

        public IHttpActionResult DeleteRef(Guid refID)
        {
            if (refID == null)
            {
                return BadRequest();
            }
            try
            {
                using (RefOutwardBLL refOutwardBLL = new RefOutwardBLL())
                {
                    var result = refOutwardBLL.DeleteRefOutward(refID);
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
        /// Lấy dữ liệu hàng hóa chi tiết theo ID phiếu xuất kho
        /// </summary>
        /// <param name="refID">ID phiếu xuất kho</param>
        /// <returns>Danh sách hàng hóa theo ID phiếu xuất kho</returns>
        /// Created by:PMDUC
        [HttpGet]
        [Route("products/{RefID}")]
        public IHttpActionResult GetListRefProducts(Guid refID)
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
        /// Tạo mới mã phiếu xuất kho
        /// </summary>
        /// <returns>Mã phiếu xuất kho mới</returns>
        /// Created by: PMDUC
        [HttpGet]
        [Route("newOutwardRefNo")]

        public IHttpActionResult NewOutwardRefNo(string prefix)
        {
            try
            {
                using (RefOutwardBLL refOutwardBLL = new RefOutwardBLL())
                {
                    var newOutwardRefNo = refOutwardBLL.NewOutwardRefNo(prefix);
                    return Ok(newOutwardRefNo);

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
                throw;
            }
        }
        /// <summary>
        /// Lấy danh sách dữ liệu đối tượng trên DB
        /// </summary>
        /// <returns>Danh sách đối tượng</returns>
        /// Created by:PMDUC
        [HttpGet]
        [Route("objects")]
        public IHttpActionResult GetListObject(int objectType, string objectFilter)
        {
            try
            {
                using (ObjectBLL objectBLL = new ObjectBLL())
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
        /// Lấy danh sách nhóm hàng hóa
        /// </summary>
        /// <returns>Danh sách nhóm hàng hóa</returns>
        [Route("itemcategory")]
        [HttpGet]
        public IHttpActionResult GetListInventoryItemCategory()
        {
            try
            {
                using (InventoryItemCategoryBLL inventoryItemCategoryBLL = new InventoryItemCategoryBLL())
                {
                    var listInventoryItemCategory = inventoryItemCategoryBLL.GetListInventoryItemCategory();
                    return Ok(listInventoryItemCategory);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        /// <summary>
        /// Lấy thông tin các hàng hóa có trong DB theo nhóm hàng hóa và từ khóa search
        /// </summary>
        /// <param name="inventoryItemCategoryID">ID nhóm hàng hóa</param>
        /// <param name="filterSearch">Từ khóa search</param>
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
        /// Lấy danh sách hàng hóa theo ID hàng hóa
        /// </summary>
        /// <param name="inventoryItemID">ID hàng hóa</param>
        /// <returns></returns>
        [Route("item/{inventoryItemID}")]
        [HttpGet]
        public IHttpActionResult GetListInventoryItem(Guid inventoryItemID)
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
        /// Lấy dữ liệu một đối tượng Từ DB
        /// </summary>
        /// <param name="accountObjectID"> ID đối tượng</param>
        /// <param name="objectType"> Loại đối tượng</param>
        /// <returns></returns>
        [HttpGet]
        [Route("objects")]
        public IHttpActionResult GetObjectbyID(Guid accountObjectID, int objectType)
        {
            try
            {
                using (ObjectBLL objectBLL = new ObjectBLL())
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
        /// Kiểm tra trùng mã phiếu xuất kho
        /// </summary>
        /// <param name="refNo">Mã phiếu xuất kho</param>
        /// <returns></returns>
        [HttpGet]
        [Route("checkDuplicateCode/{refNo}")]
        public IHttpActionResult CheckDuplicateCode(string refNo)
        {
            try
            {
                using (RefOutwardBLL refOutwardBLL = new RefOutwardBLL())
                {
                    var result = refOutwardBLL.CheckDuplicateCode(refNo);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
                throw;
            }
        }


    }
}
