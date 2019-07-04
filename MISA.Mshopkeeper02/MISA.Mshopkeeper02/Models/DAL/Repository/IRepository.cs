//createdBy NNLam : 28/04/2018
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Mshopkeeper02.Models.DAL.Repository
{
    public interface IRepository<T> where T : EntityBase
    {
        IEnumerable<T> GetAll();
        //lấy dữ liệu bản ghi tìm theo id
        T GetById(Guid id);
        //thêm dữ liệu vào bảng
        void InsertModel(T entity);
        //thao tác xóa 
        void Delete(Guid id);
        //cập nhật bảng
        void UpdateModel(T entity);
        //lưu
        void Save(T entity);
        
    }
}
