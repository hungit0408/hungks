using MISA.Mshopkeeper02.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MISA.Mshopkeeper02.Controllers
{
    public class OutwardkylsController : ApiController
    {
        /// <summary>
        /// create by: kyls (23/06/2019)
        /// get data from table OutwardTable and PersonObject to show table outward master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("outwardkyls")]
        public IEnumerable<Outwardkyls> Get()
        {
            //return Outwardkyls.Outwards;
            DataAccess<Outwardkyls> dataAccess = new DataAccess<Outwardkyls>();
            var ProcName = "[dbo].[Proc_GetDataOutwardMaster]";
            var outwards = dataAccess.GetData(ProcName, null);
            return outwards;
        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// get data from table OutwardTable and PersonObject to show dialog edit
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("outwardkyls/{VoucherCode}")]
        public IEnumerable<Outwardkyls> GetData(string VoucherCode)
        {
            DataAccess<Outwardkyls> dataAccess = new DataAccess<Outwardkyls>();
            var ProcName = "[dbo].[Proc_LoadDataForEdit]";
            SqlParameter sqlParameter = new SqlParameter("@VoucherCode", VoucherCode);
            var outwards = dataAccess.GetData(ProcName, sqlParameter);
            return outwards;
        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// get data from table TableDetail and ProductObject to table outward detail
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("outwarddetail/{VoucherCode}")]
        public IEnumerable<OutwardDetail> Get(string VoucherCode)
        {
            DataAccess<OutwardDetail> dataAccess = new DataAccess<OutwardDetail>();
            var ProcName = "[dbo].[Proc_GetDataOutwardDetail]";
            SqlParameter sqlParameter = new SqlParameter("@VoucherCode", VoucherCode);
            var outwards = dataAccess.GetData(ProcName, sqlParameter);
            return outwards;
        }


        /// <summary>
        /// create by: kyls (23/06/2019)
        /// get data from table PersonObject to show popup or dialog person in dialog add, edit,...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("objectperson")]
        public IEnumerable<ObjectPerson> GetPerson()
        {
            DataAccess<ObjectPerson> dataAccess = new DataAccess<ObjectPerson>();
            var ProcName = "[dbo].[Proc_GetAllDataPersonObject]";
            var person = dataAccess.GetData(ProcName, null);
            return person;
        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// get data from table ProductObject to show popup or dialog product in dialog add, edit,...
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("skuproduct")]
        public IEnumerable<SkuProduct> GetSku()
        {
            DataAccess<SkuProduct> dataAccess = new DataAccess<SkuProduct>();
            var ProcName = "[dbo].[Proc_GetAllDataProductObject]";
            var sku = dataAccess.GetData(ProcName, null);
            return sku;
        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// get data from table ProductObject to add data in table detail in dialog add, edit,..
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("skuproduct/{SkuCode}")]
        public IEnumerable<SkuProduct> GetSku(string SkuCode)
        {
            var dataAccess = new DataAccess<SkuProduct>();
            var ProcName = "[dbo].[Proc_LoadDataForTableDetailDialog]";
            SqlParameter sqlParameter = new SqlParameter("@SkuCode", SkuCode);          
            var sku = dataAccess.GetData(ProcName, sqlParameter);
            return sku;
        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// add new data in table OutwardTable
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("outwardkyls/newoutward")]
        public int Post([FromBody]Outwardkyls newoutward)
        {
            var dataAccess = new DataAccess<Outwardkyls>();
            var procName = "[dbo].[Proc_InsertRowTableOutward]";
            return dataAccess.PostData(newoutward, procName);

        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// add new data in table TableDetail
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("outwarddetail/outwarddetail")]
        public int PostOutwardDetail([FromBody]OutwardDetail outwarddetail)
        {
            var dataAccess = new DataAccess<OutwardDetail>();
            var procName = "[dbo].[Proc_InsertRowOutwardDetail]";
            return dataAccess.PostData(outwarddetail, procName);

        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// remove row in table OutwardTable by VoucherCode
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        [Route("outwardkyls/delete/{VoucherCode}")]
        public int DeteteRow(string VoucherCode)
        {
            var dataAccess = new DataAccess<Outwardkyls>();
            SqlParameter sqlParameter = new SqlParameter("@VoucherCode", VoucherCode);
            var ProcName = "[dbo].[Proc_RomoveRowOutwardTable]";
            return dataAccess.DeleteData(ProcName, sqlParameter);
        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// get VoucherCode not used from OutwardTable
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("getvouchercode")]
        public string GetVoucherCode()
        {
            var dataAccess = new DataAccess<Outwardkyls>();
            var ProcName = "[dbo].[Proc_GetVoucherCode]";
            return dataAccess.ReadyVoucher(ProcName);
        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// update row in table OutwardTable
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("outwardkyls/updateoutward")]
        public int UpdateOutward([FromBody] Outwardkyls updateoutward)
        {
            var dataAccess = new DataAccess<Outwardkyls>();
            var procName = "[dbo].[Proc_UpdateRowOutwardTable]";
            return dataAccess.PostData(updateoutward, procName);
        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// update row in table TableDetail
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("outwarddetail/updateoutwarddetail")]
        public int UpdateOutwardDetail([FromBody] OutwardDetail updateoutwarddetail)
        {
            var dataAccess = new DataAccess<OutwardDetail>();
            var procName = "[dbo].[Proc_UpdateRowOutwardTableDetail]";
            return dataAccess.PostData(updateoutwarddetail, procName);
        }

        /// <summary>
        /// create by: kyls (23/06/2019)
        /// remove row in table TableDetail by id in dialig edit
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        [Route("outwarddetail/delete/{iddetail}")]
        public int DeteteRowDetail(string iddetail)
        {
            var dataAccess = new DataAccess<OutwardDetail>();
            SqlParameter sqlParameter = new SqlParameter("@id", iddetail);
            var ProcName = "[dbo].[Proc_DeteteRowOutwardDetail]";
            return dataAccess.DeleteData(ProcName, sqlParameter);
        }

    }
}
