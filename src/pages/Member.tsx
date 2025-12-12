import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";

import { ReusableTable } from "../compornents/ReusableTable";
import type { Column } from "../compornents/ReusableTable";

type Member = {
  id: number;
  name: string;
  color: { label: string; value: string };
  enabled: boolean;
};

function Home() {
  const navigate = useNavigate();

  const tableData: Member[] = [
    { id: 1, name: "中根", color: { label: "赤", value: "#FF7F7F"}, enabled: true },
    { id: 2, name: "福井", color: { label: "オレンジ", value: "#FFCC80" }, enabled: false },
    { id: 3, name: "高橋", color: { label: "緑", value: "#99D699" }, enabled: true },
  ];

  const handleDelete = (name: string) => {
    if (confirm(`${name} を削除しますか？`)) {
      alert(`${name} を削除しました`);
    }
  };

  const columns: Column<Member>[] = [
    { key: "name", label: "名前", accessor: (row) => row.name },

    // 背景色表示
    {
      key: "color",
      label: "表示カラー",
      accessor: (row) => row.color.value,
      isColorCell: true,
    },

    { key: "enabled", label: "有効", accessor: (row) => (row.enabled ? "有効" : "無効") },

    {
      key: "edit",
      label: "編集",
      render: (row) => (
        <Button
          label="編集"
          size="sm"
          color="blue"
          onClick={() => navigate(`/member-edit?id=${row.id}`)}
        />
      ),
    },

    {
      key: "delete",
      label: "削除",
      render: (row) => (
        <Button
          label="削除"
          size="sm"
          color="red"
          onClick={() => handleDelete(row.name)}
        />
      ),
    },
  ];

  return (
    <Layout
      title="メンバー管理"
      rightButtons={
        <Button
          label="メンバー追加"
          onClick={() => navigate("/Member-reg")}
        />
      }
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 mt-10">
        <ReusableTable columns={columns} data={tableData} />
      </div>
    </Layout>
  );
}

export default Home;
