import { Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { NoticeService } from './notice.service';
import { Request } from 'express';

@Controller('notice')
@UseGuards(JwtAuthGuard)
export class NoticeController {
    constructor(
        private noticeService: NoticeService,
    ) { }

    @Post('/')
    createNotice(
        @Req() req: Request,
    ) {
        return this.noticeService.createNotice(req);
    }

    @Get('/')
    getNoticeList() {
        return this.noticeService.getNoticeList();
    }
    
    @Put('/:nid')
    updateNotice(
        @Req() req: Request,
        @Param('nid') nid: number
    ) {
        return this.noticeService.updateNotice(req, nid);
    }

    @Delete('/:nid')
    deleteNotice(
        @Req() req: Request,
        @Param('nid') nid: number
    ) {
        return this.noticeService.deleteNotice(req, nid);
    }
}
