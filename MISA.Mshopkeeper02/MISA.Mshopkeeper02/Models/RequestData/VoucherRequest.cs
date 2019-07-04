using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models.RequestData
{
    public class VoucherRequest
    {
        public Ref refVoucher { get; set; }
        public List<RefDetail> refDetails { get; set; }

        public string createRefDate { get; set; }
    }
}