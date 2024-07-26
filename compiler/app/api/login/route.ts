import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const pass = await prisma.user.findUnique({ where: { email,password } });

    if(pass)
    {
        return NextResponse.json({ message: 'Logged in', email }, { status: 200 });
    }

}
