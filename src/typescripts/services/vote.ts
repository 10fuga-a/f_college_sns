import { ApiClient } from '../infrastructure';
import { ApplicationManager } from '../application_manager';
import { ProductType, Product, ProductLowerType } from '../entities';

export class VoteService {
    public static async vote(method: 'POST' | 'DELETE', productId: number, genre: ProductLowerType) {
        if (method === 'POST' && this.canIncrement) {
            await this.increment(productId, genre);
        } else if (method === 'DELETE' && this.includeVoteId(productId, genre)) {
            await this.decrement(productId, genre);
        }
    }

    public static canIncrement(genre: ProductLowerType) {
        const appManager = ApplicationManager.instance;
        const maxVoteCount = genre === 'fashion' ? ApplicationManager.FASHION_VOTE_COUNT : ApplicationManager.BEAUTY_VOTE_COUNT;
        const voteIds = appManager.voteIds[genre];

        const beVoter = maxVoteCount > voteIds.length ? true : false;
        return beVoter;
    }

    public static includeVoteId(productId: number, genre: ProductLowerType): boolean {
        const appManager = ApplicationManager.instance;

        return appManager.voteIds[genre].includes(productId);
    }

    private static async increment(productId: number, genre: ProductLowerType) {
        await ApiClient.post(`/vote/${productId}`);
        const appManager = ApplicationManager.instance;
        await appManager.pushVoteIds(productId, genre);
    }

    private static async decrement(productId: number, genre: ProductLowerType) {
        await ApiClient.delete(`/vote/${productId}`);
        const appManager = ApplicationManager.instance;
        await appManager.popVoteIds(productId, genre);
    }
}
