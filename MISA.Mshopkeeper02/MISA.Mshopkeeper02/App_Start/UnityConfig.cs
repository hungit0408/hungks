using MISA.Mshopkeeper02.Models;
using MISA.Mshopkeeper02.Models.DAL.Repository;
using MISA.Mshopkeeper02.Models.DAL.RepositoryImpl;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace MISA.Mshopkeeper02
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            //container.RegisterType<VoucherRepository, VoucherRepositoryImpl>();
            container.RegisterType<ReckoningRepository, ReckoningRepositoryImpl>();
            container.RegisterType<ObjectRepository, ObjectRepositoryImpl>();

            //GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}