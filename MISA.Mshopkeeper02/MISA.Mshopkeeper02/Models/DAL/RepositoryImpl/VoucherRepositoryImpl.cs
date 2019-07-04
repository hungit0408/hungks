using MISA.Mshopkeeper02.Models.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models.DAL.RepositoryImpl
{
    //public class VoucherRepositoryImpl : Repository<Voucher>, VoucherRepository
    //{
        //private DataContext dataContext;
        //private IDbSet<Voucher> dbEntity;

        //public VoucherRepositoryImpl()
        //{
        //    dataContext = new DataContext();
        //    dbEntity = dataContext.Set<Voucher>();
        //}
        //public IEnumerable<Voucher> FindVoucherByTime(DateTime startDate, DateTime endDate)
        //{
        //    return dbEntity.Where(s => s.Created >= startDate).Where(s => s.Created <= endDate);
        //}

        //public IEnumerable<Voucher> GetListVoucherByCode(string voucherCode)
        //{
        //    return dbEntity.Where(s => s.VoucherCode == voucherCode);
        //}
    //}
}