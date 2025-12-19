import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";
import { ReusableTable } from "../compornents/ReusableTable";
import type { Column } from "../compornents/ReusableTable";

type Member = {
  id: number;
  name: string;
  enabled: boolean;
};

function Home() {
  const navigate = useNavigate();

  // サンプルデータ
  const tableData: Member[] = [
    { id: 1, name: "中根", enabled: true },
    { id: 2, name: "福井", enabled: false },
    { id: 3, name: "高橋", enabled: true },
  ];

  const handleDelete = (name: string) => {
    if (confirm(`${name} を削除しますか？`)) {
      alert(`${name} を削除しました`);
    }
  };

  const columns: Column<Member>[] = [
    { key: "name", label: "名前", accessor: (row) => row.name },

    {
      key: "enabled",
      label: "有効",
      accessor: (row) => (row.enabled ? "有効" : "無効"),
    },

    {
      key: "edit",
      label: "編集",
      render: (row) => (
        <Button
          label="編集"
          size="sm"
          color="blue"
          onClick={() => navigate(`/member-edit?id=${row.id}`)}
          className="m-auto"
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
          className="m-auto"
        />
      ),
    },
  ];

  return (
    <Layout
      title="メンバー管理"
      rightButtons={
        <>
          <Button
            label="戻る"
            size="md"
            color="gray"
            onClick={() => navigate(-1)}
          />
          <Button
            icon={<img src="../public/PeopleIcon.png" alt="icon"/>}
            label="メンバー追加"
            onClick={() => navigate("/Member-reg")}
          />
        </>
      }
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 mt-10">
        <ReusableTable columns={columns} data={tableData} />
      </div>
    </Layout>
  );
}

export default Home;
