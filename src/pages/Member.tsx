import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { ReusableTable } from "../compornents/ReusableTable";
import type { Column } from "../compornents/ReusableTable";
import Layout from "../compornents/Layout";
import Button from "../compornents/Button";


type Member = {
  id: string;
  name: string;
  enabled: boolean;
};

function Member() {
  const navigate = useNavigate();

  // テーブル表示用
  const [tableData, setTableData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  // 初回表示
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "members"));
        const membersData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Member, "id">),
        }));
        setTableData(membersData);
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 削除処理と更新
  const handleDelete = async (id: string, name: string) => {
    const ok = window.confirm(`${name} を削除しますか？`);
    if (!ok) return;

    try {
      // 削除
      await deleteDoc(doc(db, "members", id));

      // 更新
      setTableData((prev) =>
        prev.filter((member) => member.id !== id)
      );

      alert(`${name} を削除しました`);
    } catch (error) {
      console.error("削除エラー:", error);
      alert("削除に失敗しました");
    }
  };

  // テーブル定義
  const columns: Column<Member>[] = [
    {
      key: "name",
      label: "名前",
      accessor: (row) => row.name,
    },
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
      onClick={() => navigate(`/member-edit/${row.id}`)}
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
          onClick={() => handleDelete(row.id, row.name)}
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
            icon={<img src="/PeopleIcon.png" alt="icon" width="20" />}
            label="メンバー追加"
            onClick={() => navigate("/Member-registration")}
          />
        </>
      }
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 mt-10">
        {loading ? (
          <p>読み込み中・・・</p>
        ) : (
          <ReusableTable columns={columns} data={tableData} />
        )}
      </div>
    </Layout>
  );
}

export default Member;
