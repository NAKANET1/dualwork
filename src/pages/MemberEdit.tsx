import Layout from "../compornents/Layout";
import MemberSettingTable from "../compornents/MemberTable";
import Button from "../compornents/Button";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

type Member = {
  id: string;
  name: string;
  enabled: boolean;
};

function MemberEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [member, setMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    enabled: boolean;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  // Firestore から取得
  useEffect(() => {
    if (!id) return;

    const fetchMember = async () => {
      try {
        const docRef = doc(db, "members", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Omit<Member, "id">;
          setMember({ id: docSnap.id, ...data });
          setFormData({ name: data.name, enabled: data.enabled });
        } else {
          alert("データが存在しません");
          navigate(-1);
        }
      } catch (error) {
        console.error("取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id, navigate]);

  // 保存処理
  const handleSave = async () => {
    if (!id || !formData) return;

    try {
      await updateDoc(doc(db, "members", id), {
        name: formData.name,
        enabled: formData.enabled, // チェック外れ → false
      });

      alert("保存しました");
      navigate(-1);
    } catch (error) {
      console.error("保存エラー:", error);
      alert("保存に失敗しました");
    }
  };

  if (loading || !member || !formData) {
    return (
      <Layout title="メンバー編集">
        <p className="mt-6">読み込み中...</p>
      </Layout>
    );
  }

  return (
    <Layout title="メンバー編集">
      <div className="mt-6">
        <MemberSettingTable
          initialName={member.name}
          initialEnabled={member.enabled}
          onChange={setFormData}
        />
      </div>

      <div className="flex justify-center gap-10 mt-10">
        <Button label="保存" size="lg" color="blue" onClick={handleSave} />
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

export default MemberEdit;
