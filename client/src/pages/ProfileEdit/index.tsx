import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'
import PageInfo from '../../components/layout/ContentArea/PageInfo'
import { useEffect, useRef, useState } from 'react'
import { getUser, updateUser, uploadUserImage } from '../../services/userService'

import { toast, Toaster } from 'react-hot-toast'
import { FiCamera } from 'react-icons/fi'

const ProfileEdit = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [details, setDetails] = useState<User>();
    const [image, setImage] = useState<any>();
    const [name, setName] = useState<string>('');
    const inputRef = useRef<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const result = await getUser(user?.id!);
            setDetails(result.user);
        };

        fetchUser();
    }, [user?.id]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const username = e.target.username.value;
        const about = e.target.about.value;
        let statusCode: string = '500';
        let message: string = 'Something went wrong';
        
        if (!username) return;
        if (e.target.image.files.length === 1) {
            try {
                const secureUrl = await uploadUserImage(e.target.image.files[0]);
                const res = await updateUser(user?.id!, { username, about, image: secureUrl });
                statusCode = res.statusCode;
                message = res.message;
            } catch (err: any) {
                statusCode = '500';
                message = 'Failed to upload image. Please try a smaller file.';
            }
        } else {
            const res = await updateUser(user?.id!, { username, about });
            statusCode = res.statusCode;
            message = res.message;
        }

        if (statusCode === '200') {
            return toast.success(message, {
                duration: 3000,
                position: 'bottom-center',
                style: {
                    backgroundColor: '#353535',
                    color: '#fff'
                }
            });
        }

        return toast.error(message, {
            duration: 3000,
            position: 'bottom-center',
            style: {
                backgroundColor: '#353535',
                color: '#fff'
            }
        });
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleChange = (e: any) => {
        const imageFile = e.target.files[0];
        setName(imageFile.name);

        if (imageFile && FileReader) {
            const fr = new FileReader();
            fr.onload = () => {
                setImage(fr.result)
            }
            fr.readAsDataURL(imageFile);
        }
    };

    return (
        <section className="h-full flex flex-col">
            <PageInfo isChannel={false} name='Edit Profile' />
            <div className="flex-1 overflow-y-auto p-4 flex justify-center items-start md:pt-10 pt-4 scrollbar-hide">
                <form 
                    className='w-full max-w-lg bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5 rounded-3xl shadow-xl flex flex-col items-center p-8 transition-colors duration-300' 
                    onSubmit={handleSubmit} 
                    action='POST'
                >
                    <div className='flex flex-col items-center relative group w-40 h-40 mb-8'>
                        <div 
                            className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-neutral-700 group-hover:ring-indigo-500 transition-all duration-300 cursor-pointer relative"
                            onClick={handleClick}
                        >
                            <LazyLoadImage
                                className='w-full h-full object-cover'
                                src={image ? image : details?.image}
                                alt='user avatar'
                                effect='blur'
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                                <FiCamera className="text-white text-3xl mb-1" />
                                <span className="text-white text-xs font-medium">Change Photo</span>
                            </div>
                        </div>
                        {name && <p className='mt-3 text-sm text-neutral-400 text-center w-full truncate' title={name}>{name}</p>}
                        <input onChange={handleChange} ref={inputRef} type="file" name="image" hidden accept='image/png, image/jpeg' />
                    </div>

                    <div className='w-full flex flex-col gap-6 mt-2'>
                        <div className="flex flex-col">
                            <label className='text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5 ml-1' htmlFor="username">Username</label>
                            <input
                                minLength={5}
                                maxLength={20}
                                placeholder='Your distinct username'
                                className='bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/5 text-neutral-800 dark:text-neutral-100 outline-none rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all shadow-inner'
                                type="text"
                                name='username'
                                defaultValue={details?.username}
                            />
                        </div>
                        
                        <div className="flex flex-col">
                            <label className='text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-1.5 ml-1' htmlFor="about">About</label>
                            <textarea
                                spellCheck={false}
                                maxLength={250}
                                placeholder='A little something about yourself...'
                                className='bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/5 text-neutral-800 dark:text-neutral-100 outline-none rounded-xl p-3 resize-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all shadow-inner h-32'
                                name="about"
                                defaultValue={details?.about}
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 flex justify-center items-center rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 active:scale-[0.98]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster />
        </section>
    )
}

export default ProfileEdit