//CreatedBy: NNLam 28/04/2018
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace MISA.Mshopkeeper02.Models.DAL.Repository
{
    public class Repository<T> : IRepository<T> where T : EntityBase
    {
        // data context
        private DataContext dataContext;
        private IDbSet<T> dbEntity;

        // contructor
        public Repository()
        {
            dataContext = new DataContext();
            dbEntity = dataContext.Set<T>();
        }
        //Get tất cả dữ liệu
        public IEnumerable<T> GetAll()
        {
            return dbEntity.ToList();
        }
        //thêm dữ liệu
        public void InsertModel(T entity)
        {
            dbEntity.Add(entity);
            dataContext.SaveChanges();
        }
        //thêm dữ liệu
        public void Delete(Guid id)
        {
            T model = dbEntity.Find(id);
            dbEntity.Remove(model);
            dataContext.SaveChanges();
        }
        //lấy dữ liệu theo id
        public T GetById(Guid id)
        {
            return dbEntity.Find(id);
        }
        // update dữ liệu
        public void UpdateModel(T entity)
        {
            dataContext.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            dataContext.SaveChanges();
        }
        //lưu thay đổi
        public void Save(T entity)
        {
            dataContext.SaveChanges();
        }
    }
}