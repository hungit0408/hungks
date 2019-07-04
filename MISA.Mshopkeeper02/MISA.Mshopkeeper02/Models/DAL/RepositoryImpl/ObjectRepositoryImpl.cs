using MISA.Mshopkeeper02.Models.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models.DAL.RepositoryImpl
{
    public class ObjectRepositoryImpl : ObjectRepository
    {
        private DataContext dataContext;
        private IDbSet<Object> dbEntity;

        public ObjectRepositoryImpl()
        {
            dataContext = new DataContext();
            dbEntity = dataContext.Set<Object>();
        }
        public Object getObjectNameByCode(string code)
        {
            var objectName = dbEntity.Where(o => o.ObjectCode == code)
               .First();
            return objectName;
        }

        public IEnumerable<Object> GetObjectsById(string id)
        {
            throw new NotImplementedException();
        }
    }
}