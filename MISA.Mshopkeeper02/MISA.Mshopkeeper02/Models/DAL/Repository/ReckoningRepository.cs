using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Mshopkeeper02.Models.DAL.Repository
{
    public interface ReckoningRepository : IRepository<Reckoning>
    {
        //lấy list Reckoning theo VoucherId
        IEnumerable<Reckoning> GetListReckoningByVoucherId(string voucherId);
    }
}
