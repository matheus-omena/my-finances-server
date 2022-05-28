import { userSessionId } from "../../auth";
import { prisma } from "../../prisma";
import { ExpenseGroupData, ExpenseGroupQueryData, ExpenseGroupsRepository } from "../expense-groups-repository";

export class PrismaExpenseGroupsRepository implements ExpenseGroupsRepository {    
    async find() {  
        const groups = await prisma.expenseGroup.findMany();
        return groups;
    };

    async findById(id: string) {  
        const group = await prisma.expenseGroup.findUnique({
            where: {
                id: id
            }
        });

        return group;
    };

    async create({ name, color, type, paymentDate, categoryId }: ExpenseGroupData) {
        const group = await prisma.expenseGroup.create({
            data: {
                name,
                color,
                type,
                paymentDate,
                categoryId,
                createdBy: userSessionId
            }
        })

        return group;
    };

    async update({ id, name, color, type, paymentDate, categoryId }: ExpenseGroupQueryData) {
        const group = await prisma.expenseGroup.update({
            where: {
                id: id
            },
            data: {
                name,
                color,
                type,
                paymentDate,
                categoryId,
                createdBy: userSessionId
            }
        })

        return group;
    };

    async delete(id: string) {
        await prisma.expenseGroup.delete({
            where: {
                id: id
            }
        })
    };
}