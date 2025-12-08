import Layout from "../compornents/Layout";
import Button from "../compornents/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // サンプルデータ
  const tableData = [
    { id: 1, name: "中根", color: "赤", enabled: true },
    { id: 2, name: "福井", color: "青", enabled: false },
    { id: 3, name: "高橋", color: "緑", enabled: true },
  ];

  // 削除ボタンのハンドラ
  const handleDelete = (name: string) => {
    if (confirm(`${name} を削除しますか？`)) {
      alert(`${name} を削除しました`);
    }
  };

  return (
    <Layout
      title="メンバー管理"
      rightButtons={
        <>
          <Button
            label="メンバー追加"
            onClick={() => navigate("/Member-reg")}
          />
        </>
      }
    >
      <div className="flex flex-col items-center gap-4 mt-10">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">名前</th>
              <th className="px-4 py-2 border-b">表示カラー</th>
              <th className="px-4 py-2 border-b">有効</th>
              <th className="px-4 py-2 border-b">編集</th>
              <th className="px-4 py-2 border-b">削除</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{row.name}</td>
                <td className="px-4 py-2 border-b">{row.color}</td>
                <td className="px-4 py-2 border-b">
                  {row.enabled ? "有効" : "無効"}
                </td>
                {/* 編集ボタン（ページ遷移） */}
                <td className="px-4 py-2 border-b">
                  <Button
                    label="編集"
                    onClick={() => navigate(`/member-edit?id=${row.id}`)}
                  />
                </td>
                {/* 削除ボタン */}
                <td className="px-4 py-2 border-b">
                  <Button label="削除" onClick={() => handleDelete(row.name)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Home;
