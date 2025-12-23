import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import Layout from "../compornents/Layout";
import MemberSettingTable from "../compornents/MemberTable";
import Button from "../compornents/Button";

function MemberCreate() {
  const navigate = useNavigate();

  // フォーム
  const [formData, setFormData] = useState<{
    name: string;
    enabled: boolean;
  }>({
    name: "",
    enabled: true,
  });

  // 登録処理
  const handleCreate = async () => {
    if (!formData.name.trim()) {
      alert("名前を入力してください");
      return;
    }

    try {
      await addDoc(collection(db, "members"), {
        name: formData.name,
        enabled: formData.enabled,
        createdAt: serverTimestamp(),
      });

      alert("メンバーを登録しました");
      navigate(-1);
    } catch (error) {
      console.error("登録エラー:", error);
      alert("登録に失敗しました");
    }
  };

  return (
    <Layout title="メンバー登録">
      <div className="mt-6">
        <MemberSettingTable
          initialName=""
          initialEnabled={true}
          onChange={setFormData}
        />
      </div>

      <div className="flex justify-center gap-10 mt-10">
        <Button label="登録" size="lg" color="blue" onClick={handleCreate} />
        <Button
          label="戻る"
          size="lg"
          color="gray"
          onClick={() => navigate(-1)}
        />
      </div>
    </Layout>
  );
}

export default MemberCreate;
