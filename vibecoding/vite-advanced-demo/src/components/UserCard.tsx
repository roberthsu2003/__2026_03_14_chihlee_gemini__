import { User } from 'lucide-react'

// 定義元件 props 型別
interface UserCardProps {
  name: string
}

const UserCard = ({ name }: UserCardProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      padding: '12px', 
      border: '1px solid #444', 
      borderRadius: '8px',
      background: '#333'
    }}>
      <div style={{ background: '#555', padding: '8px', borderRadius: '50%', display: 'flex' }}>
        <User size={24} color="#fff" />
      </div>
      <div>
        <h4 style={{ margin: 0, color: '#fff' }}>{name}</h4>
        <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Admin 用戶</span>
      </div>
    </div>
  )
}

export default UserCard
