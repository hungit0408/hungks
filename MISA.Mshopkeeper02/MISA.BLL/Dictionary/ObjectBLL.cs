using MISA.DAL;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BLL
{
    public class ObjectBLL : IDisposable
    {
        ObjectDAL _objectDAL;

        public ObjectBLL()
        {
            _objectDAL = new ObjectDAL();
        }

        public void Dispose()
        {
            _objectDAL = null;
        }

        public IEnumerable<AccountObject> GetListObject(int objectType, string objectFilter)
        {
            var listObject = _objectDAL.GetListObject(objectType, objectFilter);
            return listObject;
        }

        public object GetObject(Guid accountObjectID, int objectType)
        {
            var objectDetail = _objectDAL.GetObject(accountObjectID, objectType);
            return objectDetail;
        }
    }
}
