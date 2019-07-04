using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Mshopkeeper02.Models.DAL.Repository
{
    public interface ObjectRepository
    {
        // lấy object theo code
        Object getObjectNameByCode(string code);

        // lấy object theo id
        IEnumerable<Object> GetObjectsById(string id);
    }
}
