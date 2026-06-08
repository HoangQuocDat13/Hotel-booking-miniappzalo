import { atom } from 'jotai'

export interface KhachHang {
    id: number
    zaloId: string
    hoTen: string
    email?: string
    anhDaiDien?: string
}

export const khachHangAtom = atom<KhachHang | null>(null)
export const tokenAtom = atom<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
)