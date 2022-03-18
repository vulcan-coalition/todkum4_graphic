
export interface ChunkData {
    name: string
    data: BufferSource | null
    segmentTime: number
    chunkIndex: number
}
export interface MediaSourcePlayerState {
    audioSrc: string
    srcDuration: number
}

export interface MediaEncryptedEvent {
    target: HTMLAudioElement
    initDataType: string
    initData: BufferSource
}