const config = require("../../core/config");
const { logger } = require("../../core/logger");
const jwt = require("jsonwebtoken");
const crypto = require("../../utils/crypto");
const ResultObject = require("../../core/http/resultObject");

module.exports = ( model ) => {
    const { User, Auth } = model;

    return {
        /**
         * 사용자 생성
         */
        createUser: async ( req, res, next ) => {
            const userData = req.body;
            const response = new ResultObject();
    
            try {
                userData.password = await crypto.getPasswordBySHA256( userData.password, userData.username );
                const userInfo = await User.create( userData );
                
                // 기본 권한 저장
                await Auth.create({
                    user_id: userInfo.id
                    , role: 'ROLE_NORMAL'
                });
    
                res.json( response );
            } catch( err ) {
                logger.error( "An error occurred while creating a user.");
                response.status = 500;
                response.message = "작업중 오류가 발생했습니다.";
    
                res.json( response );
            }
    
            next();
        },
        /**
         *  사용자 목록 가져오기
         */
        getUserList: async ( req, res, next ) => {
            console.log( req.user );
            const response = new ResultObject();
            const userList = await User.findAll({
                include: [{
                    model: Auth
                    , as: 'auths'
                }]
            });
    
            response.result = userList;
            response.count = userList.length;
    
            res.json( response );
            next();
        },
        /**
         * 로그인 처리
         */
        login: async ( req, res, next ) => {
            const response = new ResultObject();
            const userData = req.body;
            const userInfo = await User.findOne({
                where: {
                    username: userData.username
                }
                , include: [{
                    model: Auth
                    , as: 'auths'
                    , 
                }]
            });
    
            const password = await crypto.getPasswordBySHA256( userData.password, userData.username );
    
            if( userInfo.password == password ) {
                const payload = {
                    username: userInfo.username
                    , auth: []
                };
    
                userInfo.auths.forEach( ( item ) => {
                    payload.auth.push({
                        role: item.role
                    });
                });
    
    
                const token = jwt.sign( payload, config.SECRET_OR_KEY, {
                    expiresIn: '60m'
                }); // 토큰 발급
    
                response.result = {
                    token
                };
    
                res.json( response );
            } else {
                response.status = 401;
                response.message = "사용자 정보가 올바르지 않습니다.";
                res.status( 401 );
    
                res.json( response );
            }
    
            next();
        }
    }
}