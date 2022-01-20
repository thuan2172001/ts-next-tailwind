import { Table } from 'antd';

export default function CustomTable({
  tableData,
  columns,
  onChange,
}: {
  tableData: Array<any>;
  columns: Array<any>;
  onChange: (e: any) => void;
}) {
  return <Table columns={columns} dataSource={tableData} onChange={onChange} />;
}
