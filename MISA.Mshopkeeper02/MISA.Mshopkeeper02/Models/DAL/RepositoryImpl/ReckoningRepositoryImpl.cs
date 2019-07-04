using MISA.Mshopkeeper02.Models.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models.DAL.RepositoryImpl
{
    public class ReckoningRepositoryImpl : Repository<Reckoning>, ReckoningRepository
    {
        private DataContext dataContext;
        private IDbSet<Reckoning> dbEntity;

        public ReckoningRepositoryImpl()
        {
            dataContext = new DataContext();
            dbEntity = dataContext.Set<Reckoning>();
        }
        public IEnumerable<Reckoning> GetListReckoningByVoucherId(string voucherId)
        {
            return dbEntity.Where(s => s.VoucherId == voucherId);
        }
    }
}