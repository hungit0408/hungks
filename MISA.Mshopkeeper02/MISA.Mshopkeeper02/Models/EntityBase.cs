using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.Mshopkeeper02.Models.DAL
{
    public abstract class EntityBase
    {
        public Guid id { get; protected set; }
    }
}