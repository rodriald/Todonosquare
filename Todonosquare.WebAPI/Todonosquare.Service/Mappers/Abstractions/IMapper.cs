using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Todonosquare.Service.Mappers.Abstractions
{
    public interface IMapper<TEntity, TModel>
    {
        TEntity Map(TModel model);

        TModel Map(TEntity entity);

        List<TEntity> Map(List<TModel> models);

        List<TModel> Map(List<TEntity> entities);
    }
}
