using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DAL
{
    /// <summary>
    /// Lớp dùng để thực hiện các thao tác dữ liệu chung
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Base<T>
    {

        /// <summary>
        /// Hàm lấy dữ liệu từ DB sử dụng store procedure
        /// CreatedBy: NDCong(17/6/2019)
        /// </summary>
        /// <param name="commandText">Tên procedure</param>
        /// <param name="sqlParameters">Mảng chứa các parameter</param>
        /// <returns>Danh sách các thực thế</returns>
        public IEnumerable<T> GetEntities(string commandText, SqlParameter[] sqlParameters)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                sqlCommand.Parameters.AddRange(sqlParameters);
                using (SqlDataReader _sqlDataReader = sqlCommand.ExecuteReader())
                {
                    var listEntity = new List<T>();
                    while (_sqlDataReader.Read())
                    {
                        T entity = Activator.CreateInstance<T>();
                        int length = _sqlDataReader.FieldCount;
                        for (int i = 0; i < length; i++)
                        {
                            var fieldName = _sqlDataReader.GetName(i);

                            var fieldValue = _sqlDataReader.GetValue(i);

                            if (entity.GetType().GetProperty(fieldName) != null && fieldValue != DBNull.Value)
                            {
                                entity.GetType().GetProperty(fieldName).SetValue(entity, fieldValue);
                            }
                        }
                        listEntity.Add(entity);
                    }
                    return listEntity;
                }
            }
        }

        /// <summary>
        /// Lấy thông tin của một thực thể
        /// CreatedBy: NDCong(18/6/2019)
        /// </summary>
        /// <param name="commandText">tên Store</param>
        /// <param name="sqlParameter">prameter truyền lên</param>
        /// <returns></returns>
        public T GetEntity(string commandText, SqlParameter sqlParameter)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                sqlCommand.Parameters.Add(sqlParameter);
                using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                {
                    sqlDataReader.Read();
                    T entity = Activator.CreateInstance<T>();
                    int length = sqlDataReader.FieldCount;
                    for (int i = 0; i < length; i++)
                    {
                        var fieldName = sqlDataReader.GetName(i);

                        var fieldValue = sqlDataReader.GetValue(i);

                        if (entity.GetType().GetProperty(fieldName) != null && fieldValue != DBNull.Value)
                        {
                            entity.GetType().GetProperty(fieldName).SetValue(entity, fieldValue);
                        }
                    }
                    return entity;
                }
            }
        }

        /// <summary>
        /// Lấy thông tin của một thực thể dùng mảng paramater
        /// CreatedBy: NDCong(21/6/2019)
        /// </summary>
        /// <param name="commandText">tên Store</param>
        /// <param name="sqlParameters">Mảng prameter truyền lên</param>
        /// <returns></returns>
        public T GetEntity(string commandText, SqlParameter[] sqlParameters)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                sqlCommand.Parameters.AddRange(sqlParameters);
                using (SqlDataReader sqlDataReader = sqlCommand.ExecuteReader())
                {
                    sqlDataReader.Read();
                    T entity = Activator.CreateInstance<T>();
                    int length = sqlDataReader.FieldCount;
                    for (int i = 0; i < length; i++)
                    {
                        var fieldName = sqlDataReader.GetName(i);

                        var fieldValue = sqlDataReader.GetValue(i);

                        if (entity.GetType().GetProperty(fieldName) != null && fieldValue != DBNull.Value)
                        {
                            entity.GetType().GetProperty(fieldName).SetValue(entity, fieldValue);
                        }
                    }
                    return entity;
                }
            }
        }

        /// <summary>
        /// Hàm lấy dữ liệu không có một tham số duy nhất là tên storeprocedure 
        /// CreatedBy: PDXuan(18/06/2019)
        /// </summary>
        /// <param name="storeName"></param>
        /// <returns></returns>
        public IEnumerable<T> GetEntities(string storeName)
        {
            var entities = new List<T>();
            using (DatabaseAccess dataAccess = new DatabaseAccess())
            {
                // Khởi tạo đối tượng SqlDataReader hứng dữ liệu trả về:
                var sqlCommmand = dataAccess.SqlCommand;
                sqlCommmand.CommandText = storeName;
                SqlDataReader sqlDataReader = sqlCommmand.ExecuteReader();
                while (sqlDataReader.Read())
                {
                    var entity = Activator.CreateInstance<T>();
                    for (int i = 0; i < sqlDataReader.FieldCount; i++)
                    {
                        // Lấy ra tên propertyName dựa vào tên cột của field hiện tại:
                        var propertyName = sqlDataReader.GetName(i);
                        // Lấy ra giá trị của field hiện tại:
                        var propertyValue = sqlDataReader.GetValue(i);
                        // Gán Value cho Property tương ứng:
                        var propertyInfo = entity.GetType().GetProperty(propertyName);
                        if (propertyInfo != null && propertyValue != DBNull.Value)
                        {
                            propertyInfo.SetValue(entity, propertyValue);

                        }
                    }
                    entities.Add(entity);
                }

            }

            return entities;
        }

        /// <summary>
        ///Hàm lấy số lượng thực thể có trong DB
        ///CreatedBy: NDCong(19/6/2019)
        /// </summary>
        /// <param name="commandText">store procedure gọi số lượng</param>
        /// <returns></returns>
        public int GetCountEntity(string commandText)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                SqlCommand sqlCommand = databaseAccess.SqlCommand;
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                return (int)sqlCommand.ExecuteScalar();
            }
        }

        /// <summary>
        ///Hàm lấy số lượng thực thể có trong DB
        ///CreatedBy: NDCong(24/6/2019)
        /// </summary>
        /// <param name="commandText">store procedure gọi số lượng</param>
        /// <param name="sqlParameter">Parameter truyền lên</param>>
        /// <returns></returns>
        public int GetCountEntity(string commandText, SqlParameter sqlParameter)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                SqlCommand sqlCommand = databaseAccess.SqlCommand;
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                sqlCommand.Parameters.Add(sqlParameter);
                return (int)sqlCommand.ExecuteScalar();
            }
        }


        /// <summary>
        /// Hàm thêm thực thể vào DB sử dụng Store procedure
        /// CreatedBy: PDXuan(20/6/2019)
        /// </summary>
        /// <param name="commanText">Tên Store Procedure</param>
        /// <param name="sqlParameters">Thực thể cần thêm</param>
        public void AddEntity(string commandText, T entity )
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                //Khởi tạo transaction
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;

                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                sqlCommand.Transaction = sqlTransaction;
                var parameters = sqlCommand.Parameters;
                foreach (SqlParameter parameter in parameters)
                {
                    var paramName = parameter.ToString().Replace("@", string.Empty);
                    var property = entity.GetType().GetProperty(paramName);
                    if (property != null)
                    {
                        var paramValue = property.GetValue(entity);
                        parameter.Value = paramValue ?? DBNull.Value;
                    }
                }
                try
                {
                    sqlCommand.ExecuteScalar();
                    sqlTransaction.Commit();
                }
                catch
                {
                    sqlTransaction.Rollback();
                }
                
            }
        }
        /// <summary>
        /// Hàm thêm thực thể vào DB sử dụng Store procedure 
        /// CreatedBy: PDXuan(20/6/2019)
        /// </summary>
        /// <param name="commanText">Tên Store Procedure</param>
        /// <param name="sqlParameters">Thực thể cần thêm</param>
        /// <returns>ID thực thể vừa thêm</returns>
        public Guid AddEntities(string commandText, T entity)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                //Khởi tạo transaction
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;

                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                sqlCommand.Transaction = sqlTransaction;
                var parameters = sqlCommand.Parameters;
                foreach (SqlParameter parameter in parameters)
                {
                    var paramName = parameter.ToString().Replace("@", string.Empty);
                    var property = entity.GetType().GetProperty(paramName);
                    if (property != null)
                    {
                        var paramValue = property.GetValue(entity);
                        parameter.Value = paramValue ?? DBNull.Value;
                    }
                }
                try
                {
                    var newGuid = (Guid)sqlCommand.ExecuteScalar();
                    sqlTransaction.Commit();
                    return newGuid;
                }
                catch
                {
                    sqlTransaction.Rollback();
                    return new Guid();
                }
                
            }
        }
        /// <summary>
        /// Hàm thêm thực thể vào DB sử dụng Store procedure
        /// CreatedBy: PDXuan(20/6/2019)
        /// </summary>
        /// <param name="commanText">Tên Store procedure</param>
        /// <param name="sqlParameters">Các tham số đầu vào</param>
        /// <returns>Code của thực thể vừa thêm kiểu int</returns>
        public int AddEntities(string commandText, SqlParameter[] sqlParameters)
        {
            var result = 0;
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;

                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                sqlCommand.Parameters.AddRange(sqlParameters);
                try
                {
                    var newID = (int)sqlCommand.ExecuteScalar();
                    sqlTransaction.Commit();
                    return newID;
                }
                catch
                {
                    sqlTransaction.Rollback();
                    return -1;
                }
                
            }
        }

        /// <summary>
        /// Hàm thêm thực thể vào DB sử dụng Store procedure
        /// CreatedBy: NDCong(24/6/2019)
        /// </summary>
        /// <param name="commanText">Tên Store procedure</param>
        /// <param name="sqlParameters">Các tham số đầu vào</param>
        /// <returns>ID thực thể vừa thêm</returns>
        public Guid AddEntity(string commandText, SqlParameter[] sqlParameters)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;

                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                sqlCommand.Parameters.AddRange(sqlParameters);
                try
                {
                    var newID = (Guid)sqlCommand.ExecuteScalar();
                    sqlTransaction.Commit();
                    return newID;
                }
                catch
                {
                    sqlTransaction.Rollback();
                    return new Guid();
                }
            }
        }

        /// <summary>
        /// Hàm sửa thực thể từ DB
        /// CreatedBy: NDCong(19/6/2019)
        /// updatedBy: NNLam(25/06/2019)
        /// </summary>
        /// <param name="commandText">Tên Store procedure</param>
        /// <param name="entityID">ID thực thể cần sửa</param>
        /// <param name="entity">Thực thể sửa truyền lên</param>
        /// <returns></returns>
        public int EditEntity(string commandText, SqlParameter sqlParameter , T entity)
        {
            var result = -1;
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;

                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                SqlCommandBuilder.DeriveParameters(sqlCommand);
                var parameters = sqlCommand.Parameters;
                foreach (SqlParameter parameter in parameters)
                {                   
                    var paramName = parameter.ToString().Replace("@", string.Empty);
                    var property = entity.GetType().GetProperty(paramName);
                    if (property != null)
                    {
                        var paramValue = property.GetValue(entity);
                        parameter.Value = paramValue ?? DBNull.Value;
                    }
                    if (parameter.ToString() == sqlParameter.ParameterName)
                    {
                        parameter.Value = sqlParameter.Value;
                    }
                }
                try
                {
                    var numberRowAffect = sqlCommand.ExecuteNonQuery();
                    sqlTransaction.Commit();
                    return numberRowAffect;
                }
                catch
                {
                    sqlTransaction.Rollback();
                    return 0;
                }
                
            }
        }

        /// <summary>
        /// Hàm xóa thực thể từ DB
        /// updated NNLam
        /// </summary>
        /// <param name="commandText">Tên procedure</param>
        /// <param name="sqlParameter">Tham số</param>
        /// <returns></returns>
        
        public int DeleteEntity(string commandText, SqlParameter sqlParameter)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                SqlTransaction sqlTransaction = sqlCommand.Connection.BeginTransaction();
                sqlCommand.Transaction = sqlTransaction;

                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                sqlCommand.Parameters.Add(sqlParameter);
                try
                {
                    var numberRowAffect = sqlCommand.ExecuteNonQuery();
                    sqlTransaction.Commit();
                    return numberRowAffect;
                }
                catch
                {
                    sqlTransaction.Rollback();
                    return 0;
                }
                
            }
        }
        /// <summary>
        /// Tạo mới mã
        /// </summary>
        /// <param name="commandText">Tên procedure</param>
        /// <param name="sqlParameter">Tham số</param>
        /// <returns>Mã mới</returns>
        /// Created by :PMDUC
        public string GetNewCode(string commandText, SqlParameter sqlParameter)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                sqlCommand.Parameters.Add(sqlParameter);
                string result = (string)sqlCommand.ExecuteScalar();
                return result;

            }
        }

        /// <summary>
        /// Check mã
        /// </summary>
        /// <param name="commandText">Tên procedure</param>
        /// <param name="sqlParameter">Tham số</param>
        /// <returns>true/false</returns>
        /// Created by :NNLam
        public bool CheckDuplicateCode(string commandText, SqlParameter sqlParameter)
        {
            using (DatabaseAccess databaseAccess = new DatabaseAccess())
            {
                var sqlCommand = databaseAccess.SqlCommand;
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.CommandText = commandText;
                sqlCommand.Parameters.Add(sqlParameter);
                bool result = (bool)sqlCommand.ExecuteScalar();
                return result;

            }
        }
    }
}
