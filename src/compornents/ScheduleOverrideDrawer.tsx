import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import Button from './Button';

type Props = {
  /** 表示制御 */
  open: boolean;
  onClose: () => void;

  /** クリックされた予定情報 */
  triggerId: string;
  date: string;
  name: string;
  initialWorkType: '在宅' | '出勤';

  /** 変更後に再描画させる */
  onSaved: () => void;
};

function ScheduleOverrideDrawer({ open, onClose, triggerId, date, name, initialWorkType, onSaved }: Props) {
  const [workType, setWorkType] = useState<'在宅' | '出勤'>(initialWorkType);
  const [loading, setLoading] = useState(false);

  /** 表示時に初期化 */
  useEffect(() => {
    if (open) {
      setWorkType(initialWorkType);
    }
  }, [open, initialWorkType]);

  /** 単発上書き保存 */
  const handleSave = async () => {
    setLoading(true);
    try {
      /** 既存 override を削除（上書き防止） */
      const q = query(
        collection(db, 'scheduleOverrides'),
        where('triggerId', '==', triggerId),
        where('date', '==', date),
      );
      const snapshot = await getDocs(q);

      for (const doc of snapshot.docs) {
        await deleteDoc(doc.ref);
      }

      /** 新規 override 追加 */
      await addDoc(collection(db, 'scheduleOverrides'), {
        triggerId,
        date,
        workType,
        createdAt: new Date(),
      });

      onSaved();
      onClose();
    } catch (e) {
      console.error(e);
      alert('保存に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* 背景 */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-80 h-full bg-white shadow-xl p-6 animate-slide-in">
        <h2 className="text-lg font-bold mb-2">予定の変更</h2>

        <div className="text-sm text-gray-600 mb-6">
          <div>{date}</div>
          <div>{name}</div>
        </div>

        {/* 勤務タイプ切替 */}
        <div className="mb-6">
          <label className="block font-medium mb-3">勤務タイプ</label>

          <div className="flex gap-3">
            {(['在宅', '出勤'] as const).map((type) => {
              const isActive = workType === type;

              const activeClass =
                type === '在宅'
                  ? 'bg-orange-100 border-orange-400 text-orange-700'
                  : 'bg-blue-100 border-blue-400 text-blue-700';

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setWorkType(type)}
                  className={`
            px-4 py-2 rounded-md border transition
            ${isActive ? activeClass : 'border-gray-300 bg-white'}
          `}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* 操作 */}
        <div className="flex gap-4 justify-start">
          <Button label="保存" color="blue" disabled={loading} onClick={handleSave} />
          <Button label="キャンセル" color="gray" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default ScheduleOverrideDrawer;
