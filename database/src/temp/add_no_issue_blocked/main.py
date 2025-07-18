from pathlib import Path
import pandas as pd
from sqlalchemy import create_engine


script_path = Path(__file__).resolve()
script_dir = script_path.parent

file_path = script_dir / 'data_OOP' / '50' / 'Thiêt kế hướng đối tượng' / 'issue.xlsx'

save_path = script_dir / 'data_migrate' / '50' / 'Thiêt kế hướng đối tượng' / 'issue.xlsx'

df_excel = pd.read_excel(file_path)


# SQL
# Replace with your actual credentials
username = 'root'
password = '123'
host = 'localhost'          # or other hostname
port = 3306                 # default MySQL port
database = 'kltn'

# SQLAlchemy connection string
connection_string = f'mysql+mysqlconnector://{username}:{password}@{host}:{port}/{database}'

# Create engine
engine = create_engine(connection_string)

# Your SQL query (edit as needed)
sql_query = """
SELECT 
    i.name AS issue_name,
    i.sprint_id,
    i.project_id,
    COUNT(ir.issue_id) AS relation_count
FROM 
    issues i
LEFT JOIN 
    issue_relation ir 
    ON i.id = ir.issue_related_id AND ir.type_relation = 'IS_BLOCKED_BY'
WHERE 
    (i.name, i.project_id, i.sprint_id) IN (
        ('Chọn ngôn ngữ','7d783967-3144-4c76-ae91-0bcb3ebab45b','4bccc8ff-e9e3-43ec-b037-a2df9987185e'),
('Chọn đề tài','7d783967-3144-4c76-ae91-0bcb3ebab45b','4bccc8ff-e9e3-43ec-b037-a2df9987185e'),
('Lựa chọn chức năng','7d783967-3144-4c76-ae91-0bcb3ebab45b','4bccc8ff-e9e3-43ec-b037-a2df9987185e'),
('Lựa chọn chức năng','eb2cff67-6672-4ad6-8b2f-829a547c2595','4bccc8ff-e9e3-43ec-b037-a2df9987185e'),
('Chọn ngôn ngữ','eb2cff67-6672-4ad6-8b2f-829a547c2595','4bccc8ff-e9e3-43ec-b037-a2df9987185e'),
('Chọn đề tài','eb2cff67-6672-4ad6-8b2f-829a547c2595','4bccc8ff-e9e3-43ec-b037-a2df9987185e'),
('Tóm tắt kiến thức','7d783967-3144-4c76-ae91-0bcb3ebab45b','4af885f3-a68c-4204-8840-2a1c179222a4'),
('Nguyên tắc vẽ Class Diagram','7d783967-3144-4c76-ae91-0bcb3ebab45b','4af885f3-a68c-4204-8840-2a1c179222a4'),
('Nguyễn tắc vẽ Usecase digram','7d783967-3144-4c76-ae91-0bcb3ebab45b','4af885f3-a68c-4204-8840-2a1c179222a4'),
('Tóm tắt 4 tính chất OOP','eb2cff67-6672-4ad6-8b2f-829a547c2595','4af885f3-a68c-4204-8840-2a1c179222a4'),
('Nguyên tắc vẽ Usecase','eb2cff67-6672-4ad6-8b2f-829a547c2595','4af885f3-a68c-4204-8840-2a1c179222a4'),
('Nguyên tắc vẽ Class Diagram','eb2cff67-6672-4ad6-8b2f-829a547c2595','4af885f3-a68c-4204-8840-2a1c179222a4'),
('Tóm tắt Stategy pattern','7d783967-3144-4c76-ae91-0bcb3ebab45b','f19b6b33-be76-4d2b-b85d-dbd4caf3da1d'),
('Ứng dụng vào chức năng chuyển đổi đơn vị','7d783967-3144-4c76-ae91-0bcb3ebab45b','f19b6b33-be76-4d2b-b85d-dbd4caf3da1d'),
('Tóm tắt kiến thức Stategy pattern','eb2cff67-6672-4ad6-8b2f-829a547c2595','f19b6b33-be76-4d2b-b85d-dbd4caf3da1d'),
('Chức năng chuyển ngôn ngữ','eb2cff67-6672-4ad6-8b2f-829a547c2595','f19b6b33-be76-4d2b-b85d-dbd4caf3da1d'),
('Ứng dụng Observer trong chức năng thông báo','7d783967-3144-4c76-ae91-0bcb3ebab45b','8e395f10-31a4-4e06-b450-52d7c50da7e0'),
('Tóm tắt kiến thức Singleton pattern','7d783967-3144-4c76-ae91-0bcb3ebab45b','8e395f10-31a4-4e06-b450-52d7c50da7e0'),
('Tóm tắt kiến thức Observer pattern','7d783967-3144-4c76-ae91-0bcb3ebab45b','8e395f10-31a4-4e06-b450-52d7c50da7e0'),
('Ứng dụng Singleton pattern vào MySQL connection','7d783967-3144-4c76-ae91-0bcb3ebab45b','8e395f10-31a4-4e06-b450-52d7c50da7e0'),
('Ứng dụng Singleton trong MySQL connection','eb2cff67-6672-4ad6-8b2f-829a547c2595','8e395f10-31a4-4e06-b450-52d7c50da7e0'),
('Ứng dụng làm chức năng thông báo trên JavaSwing với Singleton','eb2cff67-6672-4ad6-8b2f-829a547c2595','8e395f10-31a4-4e06-b450-52d7c50da7e0'),
('Tóm tắt kiến thức Singeton pattern','eb2cff67-6672-4ad6-8b2f-829a547c2595','8e395f10-31a4-4e06-b450-52d7c50da7e0'),
('Tóm tắt kiến thức Observer pattern','eb2cff67-6672-4ad6-8b2f-829a547c2595','8e395f10-31a4-4e06-b450-52d7c50da7e0'),
('Tóm tắt kiển thức Factory Method','7d783967-3144-4c76-ae91-0bcb3ebab45b','dd34ecaf-9783-4b03-b211-edc72a3e5f31'),
('Ứng dụng Factory Method','7d783967-3144-4c76-ae91-0bcb3ebab45b','dd34ecaf-9783-4b03-b211-edc72a3e5f31'),
('Tóm tắt kiến thức Abstract Factory pattern','7d783967-3144-4c76-ae91-0bcb3ebab45b','dd34ecaf-9783-4b03-b211-edc72a3e5f31'),
('Ứng dụng Abstract Factory','7d783967-3144-4c76-ae91-0bcb3ebab45b','dd34ecaf-9783-4b03-b211-edc72a3e5f31'),
('Ứng dụng Factory Method','eb2cff67-6672-4ad6-8b2f-829a547c2595','dd34ecaf-9783-4b03-b211-edc72a3e5f31'),
('Tóm tắt kiển thức Factory Method','eb2cff67-6672-4ad6-8b2f-829a547c2595','dd34ecaf-9783-4b03-b211-edc72a3e5f31'),
('Ứng dụng Abstract Factory','eb2cff67-6672-4ad6-8b2f-829a547c2595','dd34ecaf-9783-4b03-b211-edc72a3e5f31'),
('Tóm tắt kiến thức Abstract Factory pattern','eb2cff67-6672-4ad6-8b2f-829a547c2595','dd34ecaf-9783-4b03-b211-edc72a3e5f31'),
('Ứng dụng Observer trong chức năng thông báo','7d783967-3144-4c76-ae91-0bcb3ebab45b','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Tóm tắt kiến thức decorator','7d783967-3144-4c76-ae91-0bcb3ebab45b','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Ứng dụng Decorator','7d783967-3144-4c76-ae91-0bcb3ebab45b','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Tóm tắt kiến thức iterator','7d783967-3144-4c76-ae91-0bcb3ebab45b','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Ứng dụng Iterator','7d783967-3144-4c76-ae91-0bcb3ebab45b','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Ứng dụng Singleton trong MySQL connection','eb2cff67-6672-4ad6-8b2f-829a547c2595','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Ứng dụng Iterator pattern','eb2cff67-6672-4ad6-8b2f-829a547c2595','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Tóm tắt Decorator pattern','eb2cff67-6672-4ad6-8b2f-829a547c2595','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Tóm tắt iterator pattern','eb2cff67-6672-4ad6-8b2f-829a547c2595','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Ứng dụng Decorator','eb2cff67-6672-4ad6-8b2f-829a547c2595','6a01e474-92f2-440e-9cc1-c1041de2e1be'),
('Tớm tắt kiến thức Visitor','7d783967-3144-4c76-ae91-0bcb3ebab45b','99157455-4dac-4bd4-a540-f43c0fd93145'),
('Ứng dụng Template Method','7d783967-3144-4c76-ae91-0bcb3ebab45b','99157455-4dac-4bd4-a540-f43c0fd93145'),
('Tóm tắt kiến thức Template Method','7d783967-3144-4c76-ae91-0bcb3ebab45b','99157455-4dac-4bd4-a540-f43c0fd93145'),
('Ứng dụng Visitor','7d783967-3144-4c76-ae91-0bcb3ebab45b','99157455-4dac-4bd4-a540-f43c0fd93145'),
('Tóm tắt kiến thức Visitor pattern','eb2cff67-6672-4ad6-8b2f-829a547c2595','99157455-4dac-4bd4-a540-f43c0fd93145'),
('Tóm tắt kiến thức Template Method','eb2cff67-6672-4ad6-8b2f-829a547c2595','99157455-4dac-4bd4-a540-f43c0fd93145'),
('Ứng dụng Template Method','eb2cff67-6672-4ad6-8b2f-829a547c2595','99157455-4dac-4bd4-a540-f43c0fd93145'),
('Ứng dụng MVC','7d783967-3144-4c76-ae91-0bcb3ebab45b','bbfc8df2-5eb2-4a78-84d1-1e65beddd6f3'),
('Tóm tắt kiến thức MVC','7d783967-3144-4c76-ae91-0bcb3ebab45b','bbfc8df2-5eb2-4a78-84d1-1e65beddd6f3'),
('Tóm tắt kiến thức MVC','eb2cff67-6672-4ad6-8b2f-829a547c2595','bbfc8df2-5eb2-4a78-84d1-1e65beddd6f3'),
('Ứng dụng MVC','eb2cff67-6672-4ad6-8b2f-829a547c2595','bbfc8df2-5eb2-4a78-84d1-1e65beddd6f3'),
('Tối ưu mẫu Abstract Factory Method','7d783967-3144-4c76-ae91-0bcb3ebab45b','06a57b77-0290-450f-8312-db22e8c21c78'),
('Tối ưu giao diện Java Swing','7d783967-3144-4c76-ae91-0bcb3ebab45b','06a57b77-0290-450f-8312-db22e8c21c78'),
('Tối ưu mẫu Singleton','7d783967-3144-4c76-ae91-0bcb3ebab45b','06a57b77-0290-450f-8312-db22e8c21c78'),
('Nguyên tắc vẽ Class Diagram','eb2cff67-6672-4ad6-8b2f-829a547c2595','06a57b77-0290-450f-8312-db22e8c21c78'),
('Tối ưu mẫu Abstract Factory Method','eb2cff67-6672-4ad6-8b2f-829a547c2595','06a57b77-0290-450f-8312-db22e8c21c78'),
('Tối ưu Giao diện','eb2cff67-6672-4ad6-8b2f-829a547c2595','06a57b77-0290-450f-8312-db22e8c21c78'),
('Viết Document','7d783967-3144-4c76-ae91-0bcb3ebab45b','9ebb1a1a-bbf5-4724-9692-fd08a591164b'),
('Tổng hợp mã nguồn','7d783967-3144-4c76-ae91-0bcb3ebab45b','9ebb1a1a-bbf5-4724-9692-fd08a591164b'),
('Viết Document','eb2cff67-6672-4ad6-8b2f-829a547c2595','9ebb1a1a-bbf5-4724-9692-fd08a591164b'),
('Tổng hợp mã nguồn','eb2cff67-6672-4ad6-8b2f-829a547c2595','9ebb1a1a-bbf5-4724-9692-fd08a591164b')
)
GROUP BY 
    i.name, i.sprint_id, i.project_id;
"""

df_sql = pd.read_sql_query(sql_query, engine)

print("df_excel columns:", df_excel.columns.tolist())
print("df_sql columns:", df_sql.columns.tolist())

keys = ['issue_name', 'sprint_id', 'project_id']
for key in keys:
    df_excel[key] = df_excel[key].astype(str)
    df_sql[key] = df_sql[key].astype(str)


df_merged = pd.merge(
    df_excel,
    df_sql,
    on=keys,
    how='left'
)


# --- Map relation_count → no_issue_blocked ---
df_merged['no_issue_blocked'] = df_merged['relation_count']

# --- Drop relation_count if you don't need it ---
df_merged = df_merged.drop(columns=['relation_count'])


df_merged.to_excel(save_path, index=False)

