using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models.RequestData
{
    public class FilterVoucherByTimeRequest
    {
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public int pageNumber { get; set; }
        public int numberRow { get; set; }
    }
}